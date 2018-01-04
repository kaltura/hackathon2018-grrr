import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import {registerResult} from "../actions/results";
import Header from "./header.js";

class Decision extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: localStorage.getItem('userId'),
            restaurant: JSON.parse(localStorage.getItem('restaurant')),
            emails: JSON.parse(localStorage.getItem('users'))
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
        resultDiv: {
            textAlign: 'center',
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
        },
        submitWrap : {
            padding: '10px 24px 20px'
        },
        submitButton : {
            width: '100%',
            padding: '15px',
            borderRadius: '4px',
            backgroundColor: '#e24026',
            border: 'solid 3px #000000',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold',
        },
    };

    handleSubmit(e) {
        registerResult(this.state.emails, this.state.restaurant.RestaurantId, this.state.restaurant.RestaurantName, (result) => {
            console.log(result);
            var snd = new Audio('../../assets/ass.mp3');
            snd.play();
            if(result !== false) {
                //this.setState({ saved: true });
            }
        });
        e.preventDefault();
    };


    render() {
        return (
            <div>
                <Header showTitle="false" noBackground></Header>
                <div className="padContent">
                    <div className="title">
                        <h1 style={this.styles.title}>YOU ARE GOING TO EAT AT:</h1>
                    </div>
                    <div className="result" style={this.styles.resultDiv}>
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
                    <div style={this.styles.submitWrap}>
                        <Button type="submit" onClick={this.handleSubmit.bind(this)}
                                style={this.styles.submitButton}>
                            YUM!
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Decision;