import React, { Component } from 'react';

const styles = {
    title: {
        display: 'inline-block',
        marginTop: '15px',
        marginLeft: '10px',
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.showTitle = true;
        if(this.props.showTitle !== undefined) {
            this.showTitle = this.props.showTitle;
        }
        if(!this.props.title && this.showTitle) {
            throw new DOMException("Header Component expects title prop");
        }
    }
    render() {
        return(
            <div>
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="title" style={styles.title}>{this.props.title}</span>
                            <button type="button" className="pull-left navbar-default navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><a href="/profile">My Profile</a></li>
                                <li><a href="/groups">Groups</a></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <button className="eatNow"></button>
                <button className="settings"></button>
            </div>
        )
    }
}

export default Header;