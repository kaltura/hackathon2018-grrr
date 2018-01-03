const express = require('express');
const util = require('util');
const app = express();
const helpers = require('./helpers.js');
const dal = require('./dal.js');
const users = require('./users.js');
const groups = require('./groups.js');
const rest = require('./restaurant.js');
const results = require('./results.js');

// connect to DB once:
const dbc = dal.connectDatabase();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
   
    res.setHeader('Content-Type', 'application/json');

    // Pass to next layer of middleware
    next();
});
app.get('/users', (req, res) => usersGet(req, res));
app.get('/users/:userId/history', (req, res) => userHistoryGet(req, res));
app.post('/users', (req, res) => usersPost(req, res));
app.post('/users/history', (req, res) => usersHistoryPost(req, res));

app.get('/groups', (req, res) => groupGet(req, res));
app.post('/groups', (req, res) => groupPost(req, res));

app.post('/groups/:groupName/users/:userId', (req, res) => groupAddUser(req, res));
app.delete('/groups/:groupName/users/:userId', (req, res) => groupDeleteUser(req, res));

app.get('/rests', (req, res) => restGet(req, res));

app.get('/results', (req, res) => resultsGet(req, res));




app.listen(3001, () => console.log('Example app listening on port 3001!'));

//http://localhost:3001/rests?lat=32.084824&lon=34.799720&distance=0.5

resultsGet = function(req, res) {
    results.getUsers(dbc, req.query).then(function(usersList) {
        return rest.getRests(dbc, req.query).then(function(rests) {
            return users.getHistoryFromTimeStamp(dbc, req.query).then(function(restIdsToRemove) {

                var restData = helpers.getListResponse(rests);
                restData = JSON.parse(restData).rows;


                // console.log(restData);
                var usersData = helpers.getListResponse(usersList);
                usersData = JSON.parse(usersData).rows;

                // console.log(restData);
                var restToRemoveData = helpers.getListResponse(restIdsToRemove);
                restToRemoveData = JSON.parse(restToRemoveData).rows;

                var restResults = [];
                restData.forEach(function(rest) {
                    var skip = false;
                    //check veto
                    for (var i=0; i<usersData.length; i++) {
                        if (usersData[i].veto === rest.RestaurantId) {
                            skip = true;
                            break;
                        }
                    }
                    //check history
                    for (var i=0; i<restToRemoveData.length; i++) {
                        console.log("in loop");
                        console.log(restToRemoveData[i]);
                        if (restToRemoveData[i].restId === rest.RestaurantId) {
                            skip = true;
                            break;
                        }
                    }

                    if (!skip) {
                        restResults.push(rest);
                    }

                });

                helpers.shuffleArray(restResults);
                res.send(helpers.getListResponse(restResults));
            });

        });
    });
};

restGet = function(req, res) {
    rest.getRests(dbc, req.query).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

userHistoryGet = function(req, res) {
    users.getUserHistory(dbc, req.params).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

usersHistoryPost = function(req, res) {
    users.postUserHistory(dbc, req.query).then(function() {
        res.send(true);
    });
};


groupGet = function(req, res) {
    groups.getGroups(dbc, req.query).then(function(rows) {
        groups.getGroupUsers(dbc, rows).then(function(userRows) {
            var resultDataSet = [];
            for(i=0;i<rows.length;i++) {
                console.log("working on group "+rows[i].name);
                var group = { 
                    name: rows[i].name,
                    picture: rows[i].picture,
                    company: rows[i].company,
                    users: []
                }
                var countUsers = 0;
                for(j=0;j<userRows.length;j++) {
                    console.log("checking on "+userRows[j].userId + " in "+group.name);
                    if(userRows[j].name === group.name) {
                        console.log(userRows);
                        group.users[countUsers] = userRows[j].userId;
                        console.log(userRows);
                        countUsers++;
                    }
                }
                resultDataSet[i] = group;
            }
            res.send(helpers.getListResponse(resultDataSet));
        });
    });
};

groupAddUser = function(req, res) {
    if (!req.params['userId'] || !req.params['groupName']) {
        console.error("missing params: need userId, and groupName!!!");
        console.log(req.params);
        res.send(false);
    }
    groups.getGroups(dbc, req.params)
        .then(function (rows) {
            return groups.addUserToGroup(dbc, req.params, rows).then(function(rows) {
                res.send(true);
            }, function (err) {
                console.error(err);
                res.send(false);
            });
        }, function (err) {
            console.error(err);
            res.send(false);
        });
};

groupDeleteUser = function(req, res) {
    if (!req.params['userId'] || !req.params['groupName']) {
        console.error("missing params: need userId, and groupName!!!");
        console.log(req.params);
        res.send(false);
    }
    groups.getGroups(dbc, req.params)
        .then(function (rows) {
            return groups.deleteUserFromGroup(dbc, req.params, rows).then(function(rows) {
                res.send(true);
            }, function (err) {
                console.error(err);
                res.send(false);
            });
        }, function (err) {
            console.error(err);
            res.send(false);
        });
};

groupPost = function(req, res) {
    groups.addGroup(dbc, req.query)
        .then(function(rows) {
            res.send(true);
        }, function (err) {
            console.error(err);
            res.send(false);
        });
};

usersGet = function(req, res) {

    users.getUsers(dbc, req.query).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

usersPost = function(req,res) {
    users.updateUsers(dbc, req.query).then(function(rows) {
        res.send(true);
    }, function (err) {
        console.error(err);
        res.send(false);
    });
};

