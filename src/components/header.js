import React, { Component } from 'react';

const styles = {
    box: { 
        height: '64px',
        backgroundImage: 'linear-gradient(to bottom, #f8d44c, #fd9e33)',
    },
    clearBox: {
        height: '64px',
        backgroundImage: 'none',
    },
    title: {
        display: 'inline-block',
        marginTop: '21px',
        marginLeft: '10px',
        fontSize: '18px',
        fontWeight: '600',
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

        this.boxStyle = 'box';
        if(this.props.noBackground) {
            this.boxStyle = 'clearBox';
        }

    }
    render() {
        return(
            <div style={styles[this.boxStyle]}>
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
                            <a href="/where2eat" className="btn eatNow pull-right" style={styles.eat}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                    <g fill="none" fillRule="evenodd">
                                        <g fill="#000">
                                            <path d="M16.31 4.52h-1.926v6.273c.002 1.074-.749 2.034-1.878 2.4V4.518h-1.927v8.673c-1.128-.362-1.882-1.318-1.884-2.39V4.519H6.769v6.274c.002 2.024 1.594 3.768 3.81 4.178v5.452H8.974l5.12-.008h-1.588v-5.452c2.21-.413 3.797-2.151 3.804-4.17V4.52z"/>
                                            <path d="M9.6 13.922h3.95v19.06a1 1 0 0 1-1 1H10.6a1 1 0 0 1-1-1v-19.06z"/>
                                        </g>
                                        <path fill="#000" d="M27.016 29.377h1.262v-6.33h-1.262zM30.188 23.047V3.782l-3.11 1.413a8 8 0 0 0-4.691 7.284v5.955A4.566 4.566 0 0 0 27 23l3.188.047z"/>
                                        <path fill="#FFF" d="M27.829 6.786l.433-.197v14.737h-.949a3 3 0 0 1-3-3v-6.079a6 6 0 0 1 3.516-5.461z"/>
                                        <path fill="#000" d="M26.235 21.75h3.95V33a1 1 0 0 1-1 1h-1.95a1 1 0 0 1-1-1V21.75z"/>
                                    </g>
                                </svg>
                            </a>
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