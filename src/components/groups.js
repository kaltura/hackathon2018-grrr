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

    styles = {
        addButton: {
            width: '56px',
            height: '56px',
            objectFit: 'contain',
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        }
    };

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
    memberOf(groupName) {
        var left = this.state.myGroups.filter((group) => {
            if(group.name === groupName) return true;
            return false;
        });
        return left.length > 0;
    }
    render() {
        if(this.state.otherGroups.length > 0) {
            var otherGroupsList = this.state.otherGroups.map((group) => {
                var iCanJoin = true;
                if(this.memberOf(group.name)) {
                    iCanJoin = false;
                }
                return(
                    <li key={group.name}><Group {...{group: group, canJoin: iCanJoin}}></Group></li>
                )
              });
        }
        return (
            <div>
                <Header title="Groups"></Header>
                <div className="wrap padContent">
                    <div className="groupsList">
                        { (this.state.otherGroups.length == 0)? 
                        <div>There are no more groups you can join... maybe create one?</div>
                        :
                        <div>
                            <ul className="list-unstyled">{otherGroupsList}</ul>
                        </div>
                        }
                    </div>
                    <a href="/group/add" style={this.styles.addButton}>
                        <img src="assets/add-group.svg" />
                    </a>
                </div>
            </div>
        )
    }
}

export default Groups;