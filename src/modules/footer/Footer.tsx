import React from "react";
import './footer.scss';

export default function Footer() {
    return (
        <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
                <div className="container">
                    <ul>
                        <li >
                            <a>About</a>
                        </li>
                        <li>
                            <a>Create wallet</a>
                        </li>
                        <li>
                            <a>Wallet info</a>
                        </li>
                        <li className="is-active">
                            <a>Send transactions</a>
                        </li>
                        <li>
                            <a>Cast votes</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
