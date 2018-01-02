import superagent from 'superagent'
import * as config from '../config.js';

export function listRestaurants(keyword, cb){
    superagent.post(config.BASE + 'restaurant?keyword=' + keyword)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            console.log("list restaurants, result:");
            console.log(res);
            if(err) {
                cb(false);
                return false;
            } else {
                cb(res);
                return true;
            }
        })
}
