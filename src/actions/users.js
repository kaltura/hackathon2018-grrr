import superagent from 'superagent'
import * as config from '../config';

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
export function getUser(email, cb){
    superagent.get(config.BASE + 'users?userId='+email)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            console.log("got user, result:");
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
export function updateUser(email, nick, kosher, veto, preferences, cb){
    // users?userId=<email>&nick=<nick>&kosher=true&veto=<restaurant_id>&preferences=<id,id,...id of preferencesId>
    superagent.post(config.BASE + 'users?userId='+email+'&nick='+nick+'&kosher='+kosher+'&veto='+veto+'&preferences='+preferences)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            console.log("updated user, result:");
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
export function getHistory(email, cb){
    superagent.get(config.BASE + 'users/'+email+'/history')
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            console.log("get user history, result:");
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
