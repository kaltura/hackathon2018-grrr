import superagent from 'superagent'
import * as config from '../config/config';

export function registerUser(email, nick, cb){
    superagent.post(config.BASE + 'users?userId='+email+'&nick='+nick)
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      console.log("registered user, result:");
      console.log(res);
      if(err) {
        cb(false);
        return false;
      } else {
        cb(true);
        return true;
      }
    })
  }
