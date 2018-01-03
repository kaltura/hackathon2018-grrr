
exports.connectDatabase = function() {
//connect to db
    var mysql = require('mysql');
    var dbConnection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        database : 'wheretoeat'
    });
    dbConnection.connect();
    return dbConnection;
};

exports.disconnectDatabase = function(dbConnection) {
    dbConnection.end();
};