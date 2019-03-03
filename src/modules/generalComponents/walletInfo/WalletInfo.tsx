import React, { useState } from "react";
import { Wallet } from "../../../utils/wallet";
import { Avatar } from "./avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Instructions from "./Instructions";
import CreateSecondPassphraseModal from "./createSecondPassphrase/SecondPassphrase";
import InitializeWallet from "./initializeWallet/InitializeWallet";

export interface Props {
  wallet: Wallet;
  walletReset: () => void;
}

export default function WalletInfo({ wallet, walletReset}: Props) {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [passphraseVisibility, setPassphraseVisibility] = useState<boolean>(false);
  const [initializeVisibility, setInitializeVisibility] = useState<boolean>(false);

  const [registerSecondPassphraseVisibility, setRegisterSecondPassphraseVisibility] = useState<boolean>(false);

  const toggleShowInstructions = () => setShowInstructions(!showInstructions);
  const togglePassphraseVisibility = () => setPassphraseVisibility(!passphraseVisibility);

  const openRegisterSecondPassphrase = () => setRegisterSecondPassphraseVisibility(true);
  const closeRegisterSecondPassphrase = () => setRegisterSecondPassphraseVisibility(false);
  const openInitializeModal = () => setInitializeVisibility(true);
  const closeInitializeModal = () => setInitializeVisibility(false);

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">Your new wallet:</h1>
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                {
                  // @ts-ignore
                  <Avatar address={wallet.address} size={50} />
                }
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <div className="columns">
                  <div className="column">
                    <p className="bottom5">Your public Address: </p>
                    <p>
                      <strong className="left20">
                        {wallet.address}
                      </strong>
                      <br />
                    </p>
                  </div>

                  {wallet &&
                    wallet.generatedAt &&
                    <div className="column has-text-right">
                      <p className="bottom5">Generated at: </p>
                      <p>
                        <strong className="">
                          {wallet.generatedAt.toUTCString()}
                        </strong>
                        <br />
                      </p>
                    </div>}
                </div>

                <div className="left5 right5">
                  <p className="bottom5" onClick={togglePassphraseVisibility}>Your private Passphrase: {"  "}
                    <FontAwesomeIcon icon={passphraseVisibility ? "eye-slash" : "eye"} />
                  </p>

                  <p>
                    <strong>
                      {wallet.passphrase!
                        .split(" ")
                        .map((word: string, i: number, origArr: string[]) =>
                          <span className="passphrase-word" key={i}>
                            {passphraseVisibility ? word : '••••••'}{i === origArr.length - 1 ? '': " "}
                          </span>
                        )}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="columns top20">
                <div className="column">
                  <div className="buttons">
                    <button
                      className="button is-info tooltip is-tooltip-top is-tooltip-top-desktop"
                      data-tooltip="Make sure you follow the best practices to stay safe"
                      onClick={toggleShowInstructions}
                    >
                      Instructions
                    </button>
                  </div>
                </div>
                <div className="column" />
                <div className="buttons right10 is-right">
                  <button
                    className="button tooltip is-tooltip-top is-tooltip-top-desktop is-action"
                    data-tooltip="Print paper wallet"
                    onClick={window.print}
                  >
                    <FontAwesomeIcon icon={"print"} className="dark-on-print" />
                  </button>
                  <button
                    className="button tooltip is-tooltip-top is-tooltip-top-desktop is-action"
                    data-tooltip="Create a new wallet"
                    onClick={walletReset}
                  >
                    <FontAwesomeIcon
                      icon={"sync-alt"}
                      className="dark-on-print"
                    />
                  </button>
                  <button
                    className="button tooltip is-tooltip-top is-tooltip-top-desktop is-action"
                    data-tooltip="Initialize wallet"
                    onClick={openInitializeModal}
                  >
                    <FontAwesomeIcon icon={"magic"} className="dark-on-print" />
                  </button>
                  <button
                    className="button tooltip is-tooltip-top is-tooltip-top-desktop is-action"
                    data-tooltip="Create second passphrase"
                    onClick={openRegisterSecondPassphrase}
                  >
                    <FontAwesomeIcon
                      icon={"unlock-alt"}
                      className="dark-on-print"
                    />
                  </button>
                </div>
              </div>
              <span
                className={
                  showInstructions ? "" : "is-hidden-not-on-print show-on-print"
                }
              >
                <Instructions />
              </span>
            </div>
          </article>
        </div>
      </div>
      <div className="is-clipped">
        <CreateSecondPassphraseModal close={closeRegisterSecondPassphrase} isModalOpen={registerSecondPassphraseVisibility} passphrase={wallet.passphrase!} />
        <InitializeWallet isModalOpen={initializeVisibility} close={closeInitializeModal} passphrase={wallet.passphrase!} address={wallet.address!}/>
      </div>
    </div>
  );
}
