


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

