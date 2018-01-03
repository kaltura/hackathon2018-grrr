import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { listMyGroups, listOtherGroups, joinGroup } from '../actions/groups.js'
import Group from './group.js'
import Header from './header.js';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myGroups: [],
            otherGroups: []
        }
        this.userId = localStorage.getItem('userId');
        this.nickname = localStorage.getItem('nickname');
    }
    
    componentDidMount() {
        // fetch data from API
        listMyGroups('gonen.radai@kaltura.com', (result) => {
            console.log(result);
            if(result !== false) {
                this.setState({myGroups: result});
            }
        });
        listOtherGroups('gonen.radai@kaltura.com', (result) => {
            console.log(result);
            if(result !== false) {
                this.setState({otherGroups: result});
            }
        });
    }
    render() {
        console.log("rendering component");
        if(this.state.myGroups.length > 0) {
            var myGroupsList = this.state.myGroups.map((group) => {
                return(
                    <li key={group.name}><Group {...{group: group, canJoin: false}}></Group></li>
                )
              });
        }
        if(this.state.otherGroups.length > 0) {
            var otherGroupsList = this.state.otherGroups.map((group) => {
                return(
                    <li key={group.name}><Group {...{group: group, canJoin: true}}></Group></li>
                )
              });
        }
        return (
            <div>
                <Header title="Groups"></Header>
                <div className="wrap padContent">
                    <div className="myGroupsList">
                        { (this.state.myGroups.length == 0)? 
                        <div>You are not a member of any group yet.</div>
                        :
                        <div>
                            <ul className="list-unstyled">{myGroupsList}</ul>
                        </div>
                        }
                    </div>
                    <div className="otherGroupsList">
                        { (this.state.otherGroups.length == 0)? 
                        <div>There are no more groups you can join... maybe create one?</div>
                        :
                        <div>
                            <ul className="list-unstyled">{otherGroupsList}</ul>
                        </div>
                        }
                    </div>
                    <button>Add Group</button>
                </div>
            </div>
        )
    }
}

export default Groups;