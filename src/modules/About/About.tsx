import React from "react";
import logo from "../../assets/lisk-logo.svg";

export default function About() {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <img src={logo} alt="logo" />
        <h1 className="title">Lisk Offline Wallet</h1>
        <h2 className="subtitle">Easily manage your Lisk wallet offline</h2>
      </div>
    </div>
  );
}
