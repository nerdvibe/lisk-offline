import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import "./footer.scss";

function FooterComponent(props: RouteComponentProps) {
  const isActive = (path: string) =>
    path === props.location.pathname ? "is-active" : "";
  return (
    <div className="hero-foot no-print">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            <li className={isActive("/")}>
              <Link to="/">About</Link>
            </li>
            <li className={isActive("/create-wallet")}>
              <Link to="/create-wallet">Create wallet</Link>
            </li>
            <li className={isActive("/access-wallet")}>
              <Link to="/access-wallet">Access wallet</Link>
            </li>
            <li className={isActive("/create-tx")}>
              <Link to="/create-tx">Send transactions</Link>
            </li>
            <li className={isActive("/cast-votes")}>
              <Link to="/cast-votes">Cast votes</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export const Footer = withRouter(props => <FooterComponent {...props} />);
