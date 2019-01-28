import React from "react";
import logo from "../../assets/lisk-logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src={logo} className="header-img"/>
                    Lisk Offline
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-light is-outlined no-hover">
                                <span className="icon is-large">
                                    <FontAwesomeIcon icon="check-circle" />
                                </span>
                                <span style={{paddingLeft: "3px"}}>
                                    You are offline
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
