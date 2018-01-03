const helpers = require('./helpers.js');


exports.getGroups = function(dbConnection, query) {
    var whereClause = '';
    var groupName = query['groupName'];
    var userId = query['userId'];
    var isMemberOf = query['isMemberOf'];
    var companyName = query['companyName'];
    if (!companyName && userId) {
        companyName = helpers.getCompanyName(userId);
    }

    if (groupName && companyName) {
        whereClause = 'where name="' + groupName + '" and company="' + companyName + '"';
    } else if (userId) {
        whereClause = 'where company="' + companyName + '"';
        if (isMemberOf && (isMemberOf == 'true' || isMemberOf == 1)) {
            whereClause = 'inner join GroupUsers gu on Groups.name=gu.name where gu.userId="' + userId + '" and company="' + helpers.getCompanyName(userId)+ '"';
        }
    }



    return new Promise(function(resolve,reject) {
        console.log('SELECT * from Groups ' + whereClause);
        dbConnection.query('SELECT * from Groups ' + whereClause,function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows);
        })
    });
};


exports.addUserToGroup = function(dbConnection, query, rows) {
    var groupName = query['groupName'];
    var userId = query['userId'];

    return new Promise(function(resolve,reject) {
        if (!groupName || !userId) {
            console.log("groupName and userId must be supplied");
            return reject();
        }

        if (rows.length === 0) {
            console.log("no such Group!!!");
            return reject();
        }

        dbConnection.query('INSERT INTO GroupUsers VALUES (?,?)', [groupName, userId],function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

exports.deleteUserFromGroup = function(dbConnection, query, rows) {
    var groupName = query['groupName'];
    var userId = query['userId'];

    return new Promise(function(resolve,reject) {
        if (!groupName || !userId) {
            console.log("groupName and userId must be supplied");
            return reject();
        }

        if (rows.length === 0) {
            console.log("no such Group!!!");
            return reject();
        }

        dbConnection.query('DELETE FROM GroupUsers where name=? and userId=?', [groupName, userId],function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

exports.addGroup = function(dbConnection, query) {
    var groupName = query['groupName'];
    var companyName = query['companyName'];
    var userId = query['userId'];
    if (userId) {
        companyName = helpers.getCompanyName(userId)
    }

    //TODO - add support for image (replace NULL with blob)

    return new Promise(function(resolve,reject) {
        dbConnection.query('REPLACE into Groups Values(?, NULL, ?)',[groupName, companyName],function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows);
        })
    });
};


