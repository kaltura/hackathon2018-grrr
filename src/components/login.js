import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {findDOMNode} from 'React-dom';
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            nickname: "",
            showSplash: true
        };
        setTimeout(() => this.setState({showSplash: false}), 3000)
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            if (nextProps.visible) {
                $(findDOMNode(this)).stop( true, true ).fadeIn('slow');
            } else {
                $(findDOMNode(this)).stop( true, true ).fadeOut('slow');
            }
        }
    }

    render() {
        if (this.state.showSplash) {
            return(
            <div className="Login">
                <img src={'../../assets/food_logo.png'}/>
            </div>);
        }
        return (
            <div className="Login">
                <img src={'../../assets/food.png'}/>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="nickname" bsSize="large">
                        <FormControl
                            value={this.state.nickname}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="nickname"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Grrr...
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;