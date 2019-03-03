import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FAQ from "./FAQ/FAQ";

export default function Instructions() {
  return (
    <div className="columns show-on-print">
      <div className="column content">
        <p>Make sure to store the wallet in a safe place. This wallet stores no data, make sure to properly save your data before changing page.</p>
        <p>
          <br />We advise all users to initialize their account at the nearest
          opportunity. You can do so by making sure that you address already has some LSK clicking on the{"  "}
          <FontAwesomeIcon icon={"magic"} className="right5 left5 dark-on-print" />
          {"  "}icon. You need to have at least 0.100001 LSK in your wallet and it will cost: 0.1 LSK.
        </p>
        <p>
          <br />If you want a second layer of security, you can register a second passphrase. This will make sure that whenever making transactions you'll need to type the passphrase AND the second passphrase. You can create a second passphrase so by clicking on the{"  "}
          <FontAwesomeIcon icon={"unlock-alt"} className="right5 left5 dark-on-print" />
          {"  "}icon. You need to have at least 5 LSK in your wallet and it will cost: 5 LSK.
        </p>

      <FAQ/>

      </div>
    </div>
  );
}
