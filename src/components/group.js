import React, { Component } from 'react';

class Group extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return(
            <div style={this.styles.wrap}>
                <a href={this.editUrl} style={this.styles.groupName}>{this.props.group.name}</a>
                {( this.props.canJoin )?
                <button style={this.styles.joinButton}>+ Join</button>
                :
                <span> </span>
                }
            </div>
        )

    }
}

export default Group;