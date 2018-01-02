import React, { Component } from 'react';

class Group extends Component {

    render() {
        return(
            <div>
                {this.props.group.name} 
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