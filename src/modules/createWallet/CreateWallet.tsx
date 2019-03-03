import React, { useState } from "react";
import PassphraseGenerator from "./passphraseGenerator/EntropyWizard";
import WalletInfo from "../generalComponents/walletInfo/WalletInfo";
import { Wallet } from "../../utils/wallet";

export default function CreateWallet() {
  const [wallet, setWallet] = useState<Wallet>({});

  const walletReset = () => setWallet({});

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        {(wallet && wallet.address)
          ? <WalletInfo wallet={wallet} walletReset={walletReset}/>
          : <PassphraseGenerator setWallet={setWallet} />
        }
      </div>
    </div>
  );
}
