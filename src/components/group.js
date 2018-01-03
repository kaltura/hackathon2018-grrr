import React, { Component } from 'react';

class Group extends Component {
    constructor(props) {
        super(props);
        this.editUrl = "/group/edit/"+ this.props.group.name;
    }
    render() {
        return(
            <div>
                <a href={this.editUrl}>{this.props.group.name}</a>
                {( this.props.canJoin )?
                <button>Join</button>
                :
                <span> </span>
                }
            </div>
        )
    }
}

export default Group;