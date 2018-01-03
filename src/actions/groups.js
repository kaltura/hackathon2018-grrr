import superagent from 'superagent'
import * as config from '../config.js';

export function listMyGroups(email, cb){
    console.log("going to make API call to "+config.BASE);
    superagent.get(config.BASE + 'groups?userId='+email+'&isMemberOf=1')
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      console.log("getting groups of user, result:");
      console.log(res);
      if(err) {
        cb(false);
        return false;
      } else {
        cb(res.body.rows);
        return true;
      }
    })
  }

  export function listOtherGroups(email, cb) {
    superagent.get(config.BASE + 'groups?userId='+email)
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      console.log("getting groups of user, result:");
      console.log(res);
      if(err) {
        cb(false);
        return false;
      } else {
        cb(res.body.rows);
        return true;
      }
    })
  }

  export function joinGroup(email, groupName, cb) {
    superagent.post(config.BASE + 'groups/'+groupName+'/users/'+email)
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
        debugger;
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

  export function leaveGroup(email, groupName, cb) {
    superagent.delete(config.BASE + 'groups/'+groupName+'/users/'+email)
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

  export function getGroup(groupName, cb) {
    superagent.get(config.BASE + 'users/groups?groupName='+groupName)
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      console.log("getting groups of user, result:");
      console.log(res);
      if(err) {
        cb(false);
        return false;
      } else {
        cb(res.body.objects[0]);
        return true;
      }
    })
  }

  export function addGroup(groupName, email, cb) {
    superagent.post(config.BASE + 'groups?userId='+email+'&groupName='+groupName)
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
        debugger;
      console.log("getting groups of user, result:");
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