import React, { Component } from 'react';

const styles = {
    box: { 
        height: '64px',
        backgroundImage: 'linear-gradient(to bottom, #f8d44c, #fd9e33)',
    },
    title: {
        display: 'inline-block',
        marginTop: '21px',
        marginLeft: '10px',
        fontSize: '18px',
    },
    eat: {
        display: 'inline-block',
        marginTop: '5px',
    },
    bar: {
        backgroundColor: 'black',
        borderRadius: '0px',
        height: '3px',
        width: '24px',
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
        this.showEatButton = true;
        if(this.props.showEatButton !== undefined) {
            this.showEatButton = this.props.showEatButton;
        }
    }
    render() {
        return(
            <div>
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="title" style={styles.title}>{this.props.title}</span>
                            <button type="button" className="pull-left navbar navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" style={styles.bar}></span>
                                <span className="icon-bar" style={styles.bar}></span>
                                <span className="icon-bar" style={styles.bar}></span>
                            </button>
                            { ( this.showEatButton )?
                            <a href="/where2eat" className="btn eatNow pull-right" style={styles.eat}>eat</a>
                            :
                            <span></span>
                            }
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
            </div>
        )
    }
}

export default Header;