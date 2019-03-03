import React, {useState, useEffect} from "react";
import logo from "../../assets/lisk-logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
    setDisableValidation: (state: boolean) => void;
    disableValidation: boolean;
}

export const Header = ({setDisableValidation, disableValidation}: Props) => {

    const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => setIsOffline(false));
        window.addEventListener('offline', () => setIsOffline(true));
        return () => {
            window.removeEventListener("offline", () => null);
            window.removeEventListener("online", () => null);
        };
    });

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item no-print" href="https://bulma.io">
                    <img src={logo} className="header-img"/>
                    Lisk Offline
                </a>
                <a className="navbar-item print-only" href="https://bulma.io">
                    <img src={logo} className="header-img" color="red"/>
                    Created with Lisk Offline
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">

                <div className="navbar-end">
                    <Settings setDisableValidation={setDisableValidation} disableValidation={disableValidation}/>
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className={`button is-light is-outlined no-hover`} style={{cursor: "unset"}}>
                                <span className={`icon is-large ${!isOffline && ' is-danger'}`}>
                                    <FontAwesomeIcon icon={isOffline? "check-circle": "times-circle"} />
                                </span>
                                <span style={{paddingLeft: "3px"}}>
                                    {isOffline ? 'You are offline' : 'You are online!'}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }


 const Settings = ({disableValidation, setDisableValidation}: Props) => {

    const toggleValidation = () => setDisableValidation(!disableValidation);

    return (
        <div className="navbar-item has-dropdown is-hoverable no-hover">
            <a className="navbar-link is-arrowless">
                <FontAwesomeIcon icon={"cog"}/>
            </a>

            <div className="navbar-dropdown" style={{borderTop: "transparent"}}>
                <a className="navbar-item" onClick={toggleValidation}>
                    { disableValidation ? (<span><FontAwesomeIcon icon={"exclamation"} /> Enable</span>) : 'Disable'} passphrase validation
                </a>
            </div>
        </div>
    )
};
