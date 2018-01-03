import React, { Component } from 'react';
import {joinGroup} from '../actions/groups.js'

class Group extends Component {
    constructor(props) {
        super(props);
        this.userId = localStorage.getItem('userId');
        this.editUrl = "/group/edit/"+ this.props.group.name;
    }

    styles = {
        wrap: {
            height: '64px',
            borderRadius: '4px',
            backgroundColor: '#ebebeb',
            padding: '12px 16px',
            margin: '16px 0',
        },
        groupName : {
            fontSize: '16px',
            color: '#666666',
        },
        joinButton : {
            width: '82px',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#94c01f',
            border: 'none',
            color: '#ffffff',
            fontWeight: 'bold',
            float: 'right'
        }
    };

    handleClick(e) {
        var btn = e.target;
        var groupName = btn.dataset.name;
        joinGroup(this.userId, groupName, (result) => {
            btn.remove();
        });
        e.preventDefault();
    }
    render() {
        return(
            <div style={this.styles.wrap}>
                <a href={this.editUrl} style={this.styles.groupName}>{this.props.group.name}</a>
                {( this.props.canJoin )?
                <button data-name={this.props.group.name} style={this.styles.joinButton} onClick={this.handleClick.bind(this)}>+ Join</button>
                :
                <span> </span>
                }
            </div>
        )

    }
}

export default Group;