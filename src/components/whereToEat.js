import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter} from 'react-router-dom';
import {listMyGroups, listOtherGroups, joinGroup} from '../actions/groups.js'
import {Button, Checkbox, FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import {whereToEatToday} from "../actions/results";
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

        listMyGroups(localStorage.getItem('userId'), (result) => {
            if (result !== false) {
                this.setState({myGroups: result});
            }
            if (result.length > 0) {
                this.setState({myUsers: result[0].users});
                this.selectedUsers = this.state.myUsers.slice(0);
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
        title: {
            width: '100%',
            margin: 'auto'
        },
        members: {
            padding: '10px',
            width: '100%',
            height: '100%',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            marginTop: '10px'
        },
        groups: {
            backgroundColor: '#ffffff',
            marginTop: '10px'
        },
        label: {
            width: '127px',
            height: '18px',
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.5px',
            textAlign: 'left',
            color: '#666666'
        },
        bottomText: {
            margin: 'auto',
            width: '216px',
            height: '36px',
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '500',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.29',
            letterSpacing: '0.5px',
            textAlign: 'center',
            color: '#000000'
        },
        bottomDiv: {
            width: '100%',
            margin: 'auto',
            textAlign: 'center'
        }

    };

    handleChange(e) {
        this.setState({groupName: e.target.value});
        this.setState({myUsers: this.state.myGroups[e.target.value].users});
        this.selectedUsers = this.state.myGroups[e.target.value].users.slice(0);
    }

    handleSubmit(event) {
        event.preventDefault();
        var snd = new Audio('../../assets/eat.mp3');
        snd.play();
        whereToEatToday(this.selectedUsers, (result) => {
            console.log(result);
            if (result !== false) {
                var decidedRest = {
                    RestaurantId: result.rows[0].RestaurantId,
                    RestaurantName: result.rows[0].RestaurantName,
                    RestaurantAddress: result.rows[0].RestaurantAddress,
                    RestaurantPhone: result.rows[0].RestaurantPhone,
                }
                localStorage.setItem('restaurant', JSON.stringify(decidedRest));
                localStorage.setItem('users', JSON.stringify(this.selectedUsers));
                this.props.history.push('/decision');
            } else {
                alert('failed getting result failed');
            }
        });
    }

    handleChangeChk(e) {
        if (this.selectedUsers.includes(e.target.value)) {
            var index = this.selectedUsers.indexOf(e.target.value);
            if (index > -1) {
                this.selectedUsers.splice(index, 1);
            }
        } else {
            this.selectedUsers.unshift(e.target.value)

        }
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
                    <Checkbox key={user + this.state.groupName} value={user} defaultChecked="true"
                              onChange={this.handleChangeChk.bind(this)}>{user}</Checkbox>
                )
            });
        }

        return (
            <form>
                <Header title="NOW, LET’S EAT!" noBackground></Header>
                <div className="padContent" style={this.styles.form}>
                    <ControlLabel style={this.styles.label}>SELECT GROUP:</ControlLabel>
                    <FormControl
                        style={this.styles.groups}
                        componentClass="select"
                        value={this.state.groupName}
                        onChange={this.handleChange.bind(this)}
                    >
                        {myGroupsList}
                    </FormControl>
                    <ControlLabel style={this.styles.label}>MEMBERS:</ControlLabel>
                    <FormGroup style={this.styles.members}>
                        {myUsers}
                    </FormGroup>
                </div>
                <div id="submitButton" onClick={this.handleSubmit.bind(this)}>
                    <div style={this.styles.submitButton}></div>

                </div>
                <div style={this.styles.bottomDiv}>
                    <label style={this.styles.bottomText}>Click here! and let the app choose a restaurant for
                        you!</label>
                </div>
            </form>

        )
    }
}

export default WhereToEat;