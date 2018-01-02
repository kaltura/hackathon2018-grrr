import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";
import {getUser, updateUser} from "../actions/users";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: 'username',
            preferences: '',
            kosher: true,
            veto: ''
        }
    }

    componentDidMount() {
        // fetch data from API
        getUser('gonen.radai@kaltura.com', (result) => {
            //console.log(result);
            if(result !== false) {
                // {email:<>, nick: <>, kosher:<>, veto:<>, preferences:[]}
                let res = result.body.objects[0];
                this.setState({
                    email: res.email,
                    name: res.nick,
                    kosher: res.kosher,
                    veto: res.veto,
                    preferences: res.preferences
                });
            }
        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handlePrefsChange(e) {
        this.setState({ preferences: e.target.value });
    }

    handleKosherChange(e) {
        this.setState({ kosher: e.target.checked });
    }

    handleVetoChange(e) {
        this.setState({ veto: e.target.value });
    }

    handleSubmit() {
        //email, nick, kosher, veto, preferences, cb
        updateUser(this.state.email, this.state.name, this.state.kosher, this.state.veto, this.state.preferences, (result) => {
            console.log(result);
            if(result !== false) {


            }
        })
    }

    render() {
        return (
            <div>
                <form>
                <div><FormControl
                    type="text"
                    value={this.state.name}
                    placeholder="Who are you?"
                    onChange={this.handleNameChange.bind(this)}
                /></div>
                    <div>
                        <ControlLabel>Preferences</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={this.state.preferences}
                            onChange={this.handlePrefsChange.bind(this)}
                        >
                            <option value="italian">Italian</option>
                            <option value="oriental">Oriental</option>
                            <option value="salad">Salad</option>
                        </FormControl>
                        <Checkbox value={this.state.kosher}
                                  onChange={this.handleKosherChange.bind(this)} >
                            Kosher
                        </Checkbox>

                        <ControlLabel>Veto</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.veto}
                            onChange={this.handleVetoChange.bind(this)}

                        />
                    </div>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </form>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default Profile;