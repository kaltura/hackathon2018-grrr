import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {registerUser} from "../actions/users";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            showSplash: true,
            fromLogout: false
        };
        if (this.props.match.params.fromLogout == 'fromLogout') {
            this.state.fromLogout = true;
        } else {
            setTimeout(() => {
                this.setState({showSplash: false})
                var userId = localStorage.getItem('userId');
                if (userId) {
                    this.state.email = userId;
                    this.state.nickname = localStorage.getItem('nickname');
                    this.props.history.push('/where2eat');
                }
            }, 3000)
        }
    }


    validateForm() {
        return this.state.email.length > 0 && this.state.nickname.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        registerUser(this.state.email, this.state.nickname, (result) => {
            console.log(result);
            if(result !== false) {
                localStorage.setItem('userId', this.state.email);
                localStorage.setItem('nickname', this.state.nickname);
                this.props.history.push('/profile/true');
            } else {
                alert('login failed');
            }
        });
    }

    render() {
        if (this.state.showSplash && !this.state.fromLogout) {
            return(
                <div background="#f8d44c">
            <div id="logoDiv">
                <img id="logo" src={'../../assets/food-logo.svg'}/>
            </div>
                    </div>);
        }
        return (
            <div background="#f8d44c">
            <div id="loginForm" className="Login">
                <img id="foodLogo" src={'../../assets/food.png'}
                />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormControl
                            className="textInput"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="nickname" bsSize="large">
                        <FormControl
                            className="textInput"
                            value={this.state.nickname}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="nickname"
                        />
                    </FormGroup>
                    <Button id="submit"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Grrr...
                    </Button>
                </form>
            </div>
            </div>
        );
    }
}

export default Login;