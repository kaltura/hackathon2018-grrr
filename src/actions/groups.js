import superagent from 'superagent'
import * as config from '../config.js';

export function listMyGroups(email, cb){
    console.log("going to make API call to "+config.BASE);
    superagent.get(config.BASE + 'users/groups?userId='+email+'&isMemberOf=1')
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      console.log("getting groups of user, result:");
      console.log(res);
      if(err) {
        cb(false);
        return false;
      } else {
        cb(res.body.objects);
        return true;
      }
    })
  }