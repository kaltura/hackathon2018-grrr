import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';
import { getGroup, addGroup, joinGroup } from '../actions/groups.js'
import Header from './header.js';

const styles = {
    groupInput: {
        width: '230px',
        height: '48px',
        borderRadius: '4px',
        backgroundRolor: '#ebebeb',
        display: 'inline',
    },
    addGroupBtn: {
        width: '66px',
        height: '48px',
        borderRadius: '4px',
        backgroundColor: '#e24026',
        border: 'solid 3px #000000',
        padding: '0',
        marginLeft: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
    }
}
class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name: '',
                users: [],
                // picture: '' // placeholder for group picture
        }
        this.nameFieldOpts = {};
        this.title = "Group Management";
        if(this.props.match.params.groupName) { // existing group
            this.newGroup = false;
            this.nameFieldOpts['readOnly'] = 'readOnly';
        } else {
            this.newGroup = true;
            this.title = "Create Group";
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

    addGroup(e) {
        addGroup(this.state.name, (res) => {
            alert("cool! group added...");
        });
    }
    render() {
        return (
            <div>
                <Header title={this.title}></Header>
            <form className="wrap padContent">
                <div>
                    <ControlLabel>Group Name:</ControlLabel>
                    <FormControl
                        style={styles.groupInput}
                        inline
                        type="text"
                        value={this.state.name}
                        {...this.nameFieldOpts}
                        placeholder="group name"
                        onChange={this.handleNameChange.bind(this)}
                    />
                    { ( this.newGroup )? 
                        <Button style={styles.addGroupBtn} inline type="submit" onClick={this.addGroup.bind(this)}>ADD</Button>
                        :
                        <span></span>
                    }
                    
                </div>
                <div>
                    <ControlLabel>Members:</ControlLabel>
                    { this.state.users.map((userEmail) => {
                        return (
                            <div key={userEmail}>{userEmail}</div>
                        )
                    })}
                </div>

                
            </form>
        </div>
        )
    }
}

export default GroupEdit;