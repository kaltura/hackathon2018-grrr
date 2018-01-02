import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { listMyGroups } from '../actions/groups.js'

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myGroups: [],
            otherGroups: []
        }
    }

    componentDidMount() {
        // fetch data from API
        listMyGroups('gonen.radai@kaltura.com', (result) => {
            console.log(result);
            if(result !== false) {
                this.setState({myGroups: result});
            }
        });

        let otherGroups = [ '1234' , '5678' , '989898989' ];
        setTimeout(() => {
            this.setState({otherGroups: otherGroups});
            console.log("updated my groups");
            console.log(this.state.otherGroups.length);
        }, 1000);
    }
    render() {
        console.log("rendering component");
        if(this.state.myGroups.length > 0) {
            var myGroupsList = this.state.myGroups.map((group) => {
                return(
                    <li key={group.name}>{group.name}</li>
                )
              });
        }
        if(this.state.otherGroups.length > 0) {
            var otherGroupsList = this.state.otherGroups.map((group) => {
                return(
                    <li key={group}>{group}</li>
                )
              });
        }
        return (
            <div>
                <div>Groups</div>
                <div className="myGroupsList">
                    { (this.state.myGroups.length == 0)? 
                    <div>You are not a member of any group yet.</div>
                    :
                    <div>
                        <ul className="list-unstyled">{myGroupsList}</ul>
                    </div>
                    }
                </div>
                <div className="otherGroupsList">
                    { (this.state.otherGroups.length == 0)? 
                    <div>There are no more groups you can join... maybe create one?</div>
                    :
                    <div>
                        <ul className="list-unstyled">{otherGroupsList}</ul>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Groups;