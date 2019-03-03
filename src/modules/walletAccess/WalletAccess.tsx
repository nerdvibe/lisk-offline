import React, { useState } from "react";
import {
    Wallet
} from "../../utils/wallet";
import Login from "./Login";
import WalletInfo from "../generalComponents/walletInfo/WalletInfo";

export interface Passphrase {
  wallet: Wallet;
}

export interface Props {
  disableValidation: boolean;
}

export default function WalletAccess({ disableValidation }: Props) {

    const emptyWallet = {
        wallet: {},
        hasSecondPassphrase: false
    };

  const [wallet, setWallet] = useState<Passphrase>(emptyWallet);
  const walletReset = () => setWallet(emptyWallet);

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
          { wallet.wallet.passphrase && wallet.wallet.passphrase.length ?
            <WalletInfo wallet={wallet.wallet} walletReset={walletReset}/>
            : <Login disableValidation={disableValidation} setWallet={setWallet}/>
          }
      </div>
    </div>
  );
}
