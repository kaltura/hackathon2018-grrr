import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';
import { getGroup } from '../actions/groups.js'
import Header from './header.js';

class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name: '',
                users: [],
                // picture: '' // placeholder for group picture
        }
        this.nameFieldOpts = {};
        if(this.props.match.params.groupName) { // existing group
            this.newGroup = false;
            this.nameFieldOpts['readOnly'] = 'readOnly';
        } else {
            this.newGroup = true;
        }
    }
    componentDidMount() {
        if(!this.newGroup) {
            getGroup(this.props.match.params.groupName, (groupResult) => {
                this.setState({
                    name: groupResult.name,
                    users: groupResult.users
                })
            });
        }
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit() {
        //email, nick, kosher, veto, preferences, cb
        /*updateUser(this.state.email, this.state.name, this.state.kosher, this.state.veto, this.state.preferences, (result) => {
            console.log(result);
            if(result !== false) {


            }
        })*/
    }
    render() {
        return (
            <div>
                <Header title="Edit Group"></Header>
            <form className="wrap padContent">
                <div>
                    <ControlLabel>Group Name:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        {...this.nameFieldOpts}
                        placeholder="group name"
                        onChange={this.handleNameChange.bind(this)}
                    />
                </div>
                <div>
                    <ControlLabel>Members:</ControlLabel>
                    { this.state.users.map((userEmail) => {
                        return (
                            <div key={userEmail}>{userEmail}</div>
                        )
                    })}
                </div>

                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </form>
        </div>
        )
    }
}

export default GroupEdit;