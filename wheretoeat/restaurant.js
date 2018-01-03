const https = require('https');
const request = require('request');

exports.getRests = function(dbConnection, query) {
    var keyword = query['keyword'];

    var whereClause ='';
    if (keyword) {
        whereClause = 'where RestaurantName like "%' + keyword + '%"';
    }
    return new Promise(function(resolve,reject) {
        dbConnection.query('SELECT * from Restaurants ' + whereClause, function (err, rows, fields) {
            if (err) throw err;
            console.log(rows);
            resolve(rows);
        })
    });
};

exports.getAllRestsFrom10Bis = function() {
    const originalUrl = "https://www.10bis.co.il/api/SearchRestaurantsListByMapBoundaries?westBoundary=34.76599203347606&websiteid=10bis&domainID=10bis&southBoundary=32.05032825896895&shoppingCartGuid=d6c0cee1-8c95-455a-87b1-2e9cf093cef2&eastBoundary=34.83399203717155&destinationLat=32.08432826081669&notrhBoundary=32.11832826266443&ShowOnlyOpenForPickup=false&FilterByCoupon=false&destinationLng=34.7999920353238&deliveryMethod=pickup";
    var jsonBody = null;
    var options = {
        host: "www.10bis.co.il",
        port: 443,
        path: '/api/SearchRestaurantsListByMapBoundaries?westBoundary=34.76599203347606&websiteid=10bis&domainID=10bis&isKosher=false&southBoundary=32.05032825896895&eastBoundary=34.83399203717155&destinationLat=32.08432826081669&notrhBoundary=32.11832826266443&ShowOnlyOpenForPickup=false&FilterByCoupon=false&destinationLng=34.7999920353238&deliveryMethod=pickup',
        method: 'GET'
    };
    return new Promise(function(resolve,reject) {
        https.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                jsonBody += chunk;
                console.log("chunk is done");
            });
            res.on('end', function () {
                console.log("end");
            resolve(jsonBody);

            });
        }).end();
        console.log("done");
    });
};
