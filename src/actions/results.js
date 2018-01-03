import superagent from 'superagent'
import * as config from '../config.js';

export function whereToEatToday(emails, cb){
    superagent.get(config.BASE + 'results?users='+emails.join(','))
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      if(err) {
        cb(false);
        return false;
      } else {
        cb(res.body);
        return true;
      }
    })
  }

export function registerResult(emails, restId, restName, cb){
    superagent.post(config.BASE + 'users/history?users='+emails.join(',') + '&restId=' + restId + '&restName=' + restName)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            if(err) {
                cb(false);
                return false;
            } else {
                cb(res.body);
                return true;
            }
        })
}