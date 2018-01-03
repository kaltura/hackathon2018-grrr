
exports.getListResponse = function(rows) {
    var obj = new Object();
    obj.total = rows.length;
    obj.rows = [];

    rows.forEach(function(row) {
        obj.rows.push(row);
    });
    return JSON.stringify(obj);
};


exports.getCompanyName = function(email) {
    var index = email.indexOf('@');
    var company = email.substr(index + 1);
    return company;
};