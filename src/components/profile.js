import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";
import {getUser, updateUser} from "../actions/users";
import {listRestaurants} from "../actions/restaurants";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            preferences: '',
            kosher: false,
            veto: ''
        };
        this.restaurants = [];
    }


    styles = {
        wrap : {
            width: '100%',
            height: '100%',
            backgroundColor: '#f6f4e7',
        },
        form : {
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
        submitWrap : {
            padding: '20px 24px'
        },
        submitButton : {
            width: '100%',
            padding: '15px',
            borderRadius: '4px',
            backgroundColor: '#e24026',
            border: 'solid 3px #000000',
            color: '#ffffff'
        }
    };


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

        listRestaurants('', (result) => {
            let rest = result.body.Data;
            rest.unshift({RestaurantId:"", RestaurantName: "Select..."})
            this.restaurants = rest.map(v => (
                <option value={v.RestaurantId}>{v.RestaurantName}</option>
            ));
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
            <div style={this.styles.wrap}>
                <form>
                    <div className="pageTitle">
                        <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Who are you?"
                        onChange={this.handleNameChange.bind(this)}
                    />
                    </div>
                    <div style={this.styles.form}>
                        <ControlLabel>FAVORITE FOOD</ControlLabel>
                        <FormControl
                            placeholder={"Please Choose"}
                            componentClass="select"
                            value={this.state.preferences}
                            onChange={this.handlePrefsChange.bind(this)}
                        >
                            <option value="">Select...</option>
                            <option value="italian">Italian</option>
                            <option value="oriental">Oriental</option>
                            <option value="salad">Salad</option>
                        </FormControl>

                        <Checkbox value={this.state.kosher} className="myCheckbox"
                                  onChange={this.handleKosherChange.bind(this)} >
                            KOSHER FOOD
                        </Checkbox>

                        <ControlLabel>MY VETO</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={this.state.veto}
                            onChange={this.handleVetoChange.bind(this)}
                        >
                            {this.restaurants}
                        </FormControl>

                    </div>
                    <div style={this.styles.submitWrap}>
                        <Button type="submit" onClick={this.handleSubmit.bind(this)}
                        style={this.styles.submitButton}>SAVE</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile;