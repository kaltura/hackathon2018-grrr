import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';

class WhereToEat extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        this.state = {
            date: date
        };
        this.options = {
            values: [
                { name: 'One', id: 1 },
                { name: 'Two', id: 2 },
                { name: 'Three', id: 3 },
                { name: 'four', id: 4 }
            ]
        };
    }



    render() {
        let optionTemplate = this.options.values.map(v => (
            <option value={v.id}>{v.name}</option>
        ));
        return (
            <div where to eat >
                <label>{this.state.date}</label>
                <select value={this.options.value} onChange={this.handleChange}>
                    {optionTemplate}
                </select>
            </div>
        )
    }
}

export default WhereToEat;