const express = require('express');
const util = require('util');
const app = express();
const helpers = require('./helpers.js');
const dal = require('./dal.js');
const users = require('./users.js');
const groups = require('./groups.js');
const rest = require('./restaurant.js');


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

    // Pass to next layer of middleware
    next();
});

app.get('/users', (req, res) => usersGet(req, res));
app.get('/users/:userId/history', (req, res) => userHistoryGet(req, res));
app.post('/users', (req, res) => usersPost(req, res));

app.get('/groups', (req, res) => groupGet(req, res));
app.post('/groups', (req, res) => groupPost(req, res));

app.post('/groups/:groupName/users/:userId', (req, res) => groupAddUser(req, res));
app.delete('/groups/:groupName/users/:userId', (req, res) => groupDeleteUser(req, res));

app.get('/rests', (req, res) => restGet(req, res));


//app.get('/results', (req, res) => res.send('getRest!'));



app.listen(3001, () => console.log('Example app listening on port 3001!'));


restGet = function(req, res) {
    var dbc =dal.connectDatabase();
    rest.getRests(dbc, req.query).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

userHistoryGet = function(req, res) {

    var dbc =dal.connectDatabase();
    users.getUserHistory(dbc, req.params).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

groupGet = function(req, res) {
    var dbc =dal.connectDatabase();
    groups.getGroups(dbc, req.query).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

groupAddUser = function(req, res) {
    var dbc =dal.connectDatabase();
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
    var dbc =dal.connectDatabase();
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
    var dbc = dal.connectDatabase();
    groups.addGroup(dbc, req.query)
        .then(function(rows) {
            res.send(true);
        }, function (err) {
            console.error(err);
            res.send(false);
        });
};

usersGet = function(req, res) {

    var dbc =dal.connectDatabase();
    users.getUsers(dbc, req.query).then(function(rows) {
        res.send(helpers.getListResponse(rows));
    });
};

usersPost = function(req,res) {
    var dbc =dal.connectDatabase();
    users.updateUsers(dbc, req.query).then(function(rows) {
        res.send(true);
    }, function (err) {
        console.error(err);
        res.send(false);
    });
};

