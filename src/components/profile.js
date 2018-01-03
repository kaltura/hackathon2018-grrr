import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";
import {getUser, updateUser, getHistory} from "../actions/users";
import {listRestaurants} from "../actions/restaurants";
import Header from './header.js';
import Food from './food.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('userId'),
            name: '',
            preferences: '',
            kosher: false,
            veto: '',
            restaurants: [],
            history: [],
            saved: false
        };
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
            padding: '10px 24px 20px'
        },
        submitButton : {
            width: '100%',
            padding: '15px',
            borderRadius: '4px',
            backgroundColor: '#e24026',
            border: 'solid 3px #000000',
            color: '#ffffff'
        },
        label : {
            marginBotom: '18px'
        },
        tableTop : {
            paddingTop: '18px',
            overflow: 'scroll',
            height: '63px'
        },
        foods: {
            padding: "20px 0",
        }
    };


    formatDate(date) {
        let d = new Date(date) ;
        return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    }
    componentDidMount() {
        // fetch data from API
        getUser(this.state.email, (result) => {
            console.log("Here is user history");
            console.log(result);
            if(result !== false && result.body.rows.length > 0) {
                // {email:<>, nick: <>, kosher:<>, veto:<>, preferences:[]}
                let res = result.body.rows[0];
                var KosherBool = (res.kosher == 1)? true: false;
                this.setState({
                    email: res.userId,
                    name: res.nick,
                    kosher: KosherBool,
                    veto: res.veto,
                    preferences: res.preferences
                });
            }
        });

        listRestaurants('', (result) => {
            if (!result) return;
            let rest = result.rows;
            rest.unshift({RestaurantId:"", RestaurantName: "Shall Not Eat In..."});
            this.setState({restaurants : rest.map(v => (
                <option key={v.RestaurantId} value={v.RestaurantId}>{v.RestaurantName}</option>
            ))});
        });

        getHistory(this.state.email, (result) => {
            if (result.body && result.body !== false) {
                let hist = result.body.rows;
                this.setState({
                    history: hist.map(v => (
                        <tr>
                           <td className="rest-name">{v.restName}</td>
                           <td className="rest-date">{this.formatDate(v.date)}</td>
                       </tr>
                    ))
                });
            }
            else {
                console.log("failed to get history");
            }
        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value, saved: false });
    }

    handlePrefsChange(e) {
        this.setState({ preferences: e.target.value, saved: false });
    }

    handleKosherChange(e) {
        this.setState({ kosher: e.target.checked, saved: false });
    }

    handleVetoChange(e) {
        this.setState({ veto: e.target.value, saved: false });
    }

    handleSubmit(e) {
        //email, nick, kosher, veto, preferences, cb
        updateUser(this.state.email, this.state.name, Number(this.state.kosher), this.state.veto, this.state.preferences, (result) => {
            //console.log(result);
            if(result !== false) {
                this.setState({ saved: true });
                let fromLogin = this.props.match.params.fromLogin;
                if (fromLogin) {
                    this.props.history.push('/groups');
                }
            }
        })
        e.preventDefault();
    }

    render() {
        return (
            <div style={this.styles.wrap}>
                <Header title="My Profile"></Header>
                <form>
                    <div style={this.styles.form}>
                        <ControlLabel>NICKNAME:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Who are you?"
                            onChange={this.handleNameChange.bind(this)}
                        />
                        <ControlLabel>MY VETO:</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={this.state.veto}
                            onChange={this.handleVetoChange.bind(this)}
                        >
                            {this.state.restaurants}
                        </FormControl>
                        <ControlLabel>FAVORITE FOOD:</ControlLabel>
                        <div className="foods" style={this.styles.foods}>
                            <Food item="hamburger"></Food>
                            <Food item="salet"></Food>
                            <Food item="sandwiches"></Food>
                            <Food item="sushi"></Food>
                        </div>
                        <Checkbox value={this.state.kosher} checked={this.state.kosher} className="myCheckbox"
                                  onChange={this.handleKosherChange.bind(this)} >
                            KOSHER FOOD
                        </Checkbox>
                    </div>
                    <div style={this.styles.submitWrap}>
                        <Button type="submit" onClick={this.handleSubmit.bind(this)}
                        style={this.styles.submitButton}>
                        { (this.state.saved) ? 'SAVED' : 'SAVE' }
                        </Button>
                    </div>
                    <div style={this.styles.form}>
                        <ControlLabel>MY HISTORY:</ControlLabel>
                        <div style={this.styles.tableTop}>
                            <table className="history">
                            {this.state.history}
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile;