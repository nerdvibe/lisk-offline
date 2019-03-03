import React, { useState } from "react";
import CreateTxForm from "./CreateTxForm";
import AddressField from "../createTx/CreateTxForm";
import PassphraseField from "../generalComponents/passphraseField";

export interface Form {
  passphrase: string;
  [key: string]: string | number;
}

export default function WalletAccess() {
  const [passphrase, setPassphrase] = useState<string>("");

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">Access your wallet</h1>
        <p>Here you can retrive the info about your wallet:</p>
        <div>
          <div className="columns top20">
            <div className="column is-one-fifth" />
            <div className="column">
              <PassphraseField icon={"key"} parentMethod={setPassphrase} />
              <div className="field has-text-left">
                <label className="checkbox ">
                  <input type="checkbox" onClick={toggleSecondPassphrase} />
                  <span className="left10">I have a secondary passphrase</span>
                </label>
              </div>
            </div>
            <div className="column is-one-fifth" />
          </div>
        </div>
      </div>
    </div>
  );
}
