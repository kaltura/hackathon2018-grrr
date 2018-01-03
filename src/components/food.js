import React, { Component } from 'react';

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetUrl : "/assets/"+ props.item,
        }
    }

    styles = {
        wrap: {
            height: '64px',
            width: '78px',
            display: 'inline-block',
        },

    };

    render() {
        return(
            <div style={this.styles.wrap}>
                <div className="food" style={{backgroundImage: 'url(' + this.state.assetUrl + '.svg)'}}></div>
            </div>
        )

    }
}

export default Food;