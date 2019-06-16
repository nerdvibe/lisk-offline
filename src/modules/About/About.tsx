import React from "react";
import logo from "../../assets/lisk-logo";

export default function About() {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <img src={logo} alt="logo" />
        <h1 className="title">Lisk Offline Wallet</h1>
        <h2 className="subtitle" style={{marginBottom:10}}>Easily manage your Lisk wallet offline</h2>
        <h2 className="subtitle" style={{fontSize: '1rem', opacity: 0.3}}>Created by delegate Carbonara</h2>
      </div>
    </div>
  );
}
