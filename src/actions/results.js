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