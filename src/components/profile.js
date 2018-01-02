import React, { Component } from 'react';
import { Button, Checkbox, FormControl, ControlLabel } from "react-bootstrap";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'username',
            preferences: '',
            kosher: true,
            veto: ''
        }
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
                    <button type="submit">Submit</button>
                </form>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default Profile;