import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter} from 'react-router-dom';
import {listMyGroups, listOtherGroups, joinGroup} from '../actions/groups.js'
import {Button, Checkbox, FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import "./WhereToEat.css";
import Header from './header.js';

class WhereToEat extends Component {

    constructor(props) {
        super(props);

        var today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        this.state = {
            date: date,
            groupName: "Select...",
            myGroups: [],
            myUsers: []
        };

        listMyGroups('gonen.radai@kaltura.com', (result) => {
            if (result !== false) {
                this.setState({myGroups: result});
            }
            if (result.length > 0) {
                this.setState({myUsers: result[0].users});
                this.selectedUsers = this.state.myUsers.map()
            }
        });
    }

    styles = {
        wrap: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f6f4e7',
        },
        form: {
            padding: '20px 24px',
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.5px',
            textAlign: 'left',
            color: '#666666',
        },
        submitWrap: {
            padding: '20px 24px'
        },

        eat: {
            width: '48px',
            height: '48px',
            objectFit: 'contain'
        },
        nowLetsEat: {
            width: '203px',
            height: '27px',
            fontFamily: 'Montserrat',
            fontSize: '22px',
            fontWeight: '800',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.5px',
            textAlign: 'left',
            color: '#000000',
        },
        title: {
            width: '100%',
            margin: 'auto'
        },
        members: {
            padding: '10px',
            width: '100%',
            height: '100%',
            borderRadius: '4px',
            backgroundColor: '#ffffff'
        }
    };

    handleChange(e) {
        this.setState({groupName: e.target.value});
        this.setState({myUsers: this.state.myGroups[e.target.value].users});

    }

    handleSubmit() {

    }

    handleChangeChk(e) {
        alert(e.target.value);
    }

    render() {
        if (this.state.myGroups.length > 0) {
            var myGroupsList = this.state.myGroups.map((group, id) => {
                return (
                    //<li key={group.name}><Group {...{group: group, canJoin: false}}></Group></li>
                    <option key={id} value={id}>{group.name}</option>

                )
            });
        }

        if (this.state.myUsers.length > 0) {
            var myUsers = this.state.myUsers.map((user, id) => {
                return (
                    <Checkbox key={id} value={user} defaultChecked="true" onChange={this.handleChangeChk.bind(this)}>{user}</Checkbox>
                )
            });
        }

        return (
            <form>
                <Header title="NOW, LET’S EAT!" noBackground></Header>
                <div className="padContent" style={this.styles.form}>
                    <ControlLabel>SELECT GROUP:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.groupName}
                        onChange={this.handleChange.bind(this)}
                    >
                        {myGroupsList}
                    </FormControl>
                    <ControlLabel>MEMBERS:</ControlLabel>
                    <FormGroup style={this.styles.members}>
                        {myUsers}
                    </FormGroup>
                </div>
                <div id="submitButton">
                    <div style={this.styles.submitButton}></div>
                </div>
            </form>

        )
    }
}

export default WhereToEat;