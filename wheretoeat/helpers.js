
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

exports.getLastSunday = function() {
    var t = new Date(Date.now());
    t.setDate(t.getDate() - t.getDay());
    return Math.floor(t.getTime()/1000);
};


exports.shuffleArray = function(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
};