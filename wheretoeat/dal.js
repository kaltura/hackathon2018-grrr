
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

exports.getInClasue = function(csvString, column) {
    var valuesArr = csvString.split(',');
    var inClause = column +' in (';
    valuesArr.forEach(function(value) {
        inClause = inClause + "'" + value + "',";
    });
    inClause = inClause.slice(0, -1);
    inClause = inClause + ")";
    return inClause
};