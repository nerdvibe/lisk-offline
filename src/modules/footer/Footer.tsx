import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import './footer.scss';

function FooterComponent(props: RouteComponentProps) {

    const isActive = (path: string) => path === props.location.pathname ? 'is-active': '';
    return (
        <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
                <div className="container">
                    <ul>
                        <li className={ isActive('/') }>
                            <Link to="/">About</Link>
                        </li>
                        <li className={ isActive('/create-wallet') }>
                            <Link to="/">Create wallet</Link>
                        </li>
                        <li className={ isActive('/wallet-info') }>
                            <Link to="/">Wallet info</Link>
                        </li>
                        <li className={ isActive('/create-tx') }>
                            <Link to="/create-tx">Send transactions</Link>
                        </li>
                        <li className={ isActive('/cast-votes') }>
                            <Link to="/">Cast votes</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export const Footer = withRouter(props => <FooterComponent {...props}/>);
