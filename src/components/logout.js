import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('userId');
        localStorage.removeItem('nickname');
        props.history.push('/login/fromLogout')
    }

    render() {
        return (
            <div />

        );
    }
}

export default Logout