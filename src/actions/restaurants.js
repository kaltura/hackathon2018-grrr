import superagent from 'superagent'
import * as config from '../config';

export function listRestaurants(keyword, cb){
    let url = config.BASE + 'restaurant';
    if (keyword) {
        url += '?keyword=' + keyword;
    }
    superagent.get(url)
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
