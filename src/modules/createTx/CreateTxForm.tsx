import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CreateTxForm() {
  return (
    <div>
      <div className="columns top20">
        <div className="column is-one-fifth" />
        <div className="column">
          <div className="field has-text-left">
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="Recipient" />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="exchange-alt"/>
              </span>
            </p>
          </div>
          <div className="field has-text-left">
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="Amount" />
              <span className="icon is-small is-left">
                Ⱡ
              </span>
            </p>
          </div>
          <div className="field has-text-left">
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="Passphrase" />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="key"/>
              </span>
            </p>
          </div>
          <div className="field has-text-left">
              <label className="checkbox ">
                  <input type="checkbox"/>
                      <span className="left10">
                          I have a secondary pasphrase
                      </span>
              </label>
          </div>
        <div className="field has-text-left">
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="Second Passphrase" />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="unlock-alt"/>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-text-right">
              <button className="button is-success is-outlined">Login</button>
            </p>
          </div>
        </div>
        <div className="column is-one-fifth" />
      </div>
    </div>
  );
}
