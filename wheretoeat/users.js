
const helpers = require('./helpers.js');
const dal = require('./dal.js');


exports.getUsers = function(dbConnection, query) {
    var userId = query['userId'];
    var filter = query['filter'];

    var whereClause ='';
    if (userId) {
        whereClause = 'where userId="' + userId + '"';
    } else if (filter) {
        whereClause = 'where userId like "%@' + helpers.getCompanyName(filter) + '"';
    }
    return new Promise(function(resolve,reject) {
        dbConnection.query('SELECT * from Users ' + whereClause, function (err, rows, fields) {
            if (err) throw err;
            console.log(rows);
            resolve(rows);
        })
    });
};

exports.getUserHistory = function(dbConnection, query) {
    var userId = query['userId'];
    return new Promise(function(resolve,reject) {
        if (!userId) {
            return reject();
        }

        dbConnection.query('SELECT * from UserHistory where userId=? ORDER BY date DESC',[userId], function (err, rows, fields) {
            if (err) {
                return reject();
            }
            console.log(rows);
            resolve(rows);
        })
    });
};

exports.getHistoryFromTimeStamp = function(dbConnection, query) {
    var users = query['users'];
    var inClause = dal.getInClasue(users, "userId");
    var fromTimestamp = helpers.getLastSunday();
    var sqlQuery = "select restId from UserHistory where date > " + fromTimestamp + " and " + inClause;
    console.log(sqlQuery);
    return new Promise(function(resolve,reject) {
        dbConnection.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                return reject();
            }
            console.log("%%%%%%%%%");

            console.log(rows);
            resolve(rows);
        })
    });
};

exports.postUserHistory = function(dbConnection, query) {
    var users = query['users'];
    var restId = query['restId'];
    var restName = query['restName'];
    var timeStamp = Date.now();
    var userArray = users.split(',');
    var sqlQuery = "insert into UserHistory (userId, restId, date, restName) values ";
    userArray.forEach(function(user) {
        sqlQuery = sqlQuery + "('" +user + "'," + restId + "," + timeStamp + ",'" + restName + "'),";
    });

    sqlQuery = sqlQuery.slice(0, -1);
    console.log(sqlQuery);

    return new Promise(function(resolve,reject) {
        console.log("in promises");

        dbConnection.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log("in err");

                return reject();
            }
            console.log(rows);
            resolve(rows);
        })
    });
};


exports.updateUsers = function(dbConnection, query) {
    var userId = query['userId'];
    var nick = query['nick'];
    var kosher = query['kosher'];
    var veto = query['veto'];
    var preferences = query['preferences'];

    return new Promise(function(resolve,reject) {
        if (!userId) {
            console.log('userId is mandatory!');
            return reject();

        }

        dbConnection.query('REPLACE INTO Users VALUES (?,?,?,?,?)', [userId, nick, kosher,veto, preferences],function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            console.log(rows);
            resolve(rows);
        })
    });
};

