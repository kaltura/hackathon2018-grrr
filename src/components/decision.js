import React, { Component } from 'react';

class Decision extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: localStorage.getItem('userId'),
            restaurant: {
                RestaurantId:19700,
                RestaurantName:	"שיפודי התקווה נמל",
                RestaurantAddress:	"נמל תל אביב 6, תל אביב יפו",
                RestaurantPhone:"036053360",
            },
        };
    }

    styles = {
        title: {
            fontSize: '39px',
            fontWeight: '800',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1.4px',
            textAlign: 'center',
            color: '#000000',
            padding: '30px',
        },
        result: {
            fontSize: '36px',
            fontWeight: '500',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1.4px',
            textAlign: 'center',
            color: '#ffffff',
            fontFamily: 'Arimo',
            borderBottom: '4px solid #e24026'
        },
        address : {
            fontFamily: 'Arimo',
            fontSize: '14px',
            fontWeight: '500',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.5px',
            textAlign: 'left',
            color: '#000000',
        },
        details : {
            margin: "48px 0",
        }
    };

    render() {
        return (
        <div className="padContent">
            <div className="title">
                <h1 style={this.styles.title}>YOU ARE GOING TO EAT AT:</h1>
            </div>
            <div className="result">
                <span style={this.styles.result}>{this.state.restaurant.RestaurantName}</span>
            </div>
            <div style={this.styles.details}>
                <div className="address">
                    <img src={"/assets/gps.svg"}/>
                    <span style={this.styles.address}>{this.state.restaurant.RestaurantAddress}</span>
                </div>
                <div className="address">
                    <img src={"/assets/phone.svg"}/>
                    <span style={this.styles.address}>{this.state.restaurant.RestaurantPhone}</span>
                </div>
            </div>
        </div>
        )
    }
}

export default Decision;