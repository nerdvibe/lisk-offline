import React, { useState } from "react";
import { Tx } from "./CreateTx";
import PassphraseField from "../generalComponents/PassphraseField";
import AddressField from "../generalComponents/AddressField";
import { isValidAddress, isValidAmount } from "../../utils/validation";
import { createTransaction } from "../../utils/wallet";
import QRCodeBroadcast from "./QRCodeBroadcast";

interface Props {
  tx: Tx;
  setTx: (tx: Tx) => void;
  disableValidation: boolean;
}
export default function CreateTxForm({ tx, setTx, disableValidation }: Props) {
  const [secondPassphrase, setSecondPassphrase] = useState<Boolean>(false);
  const [signedTx, setSignedTx] = useState<string>("");
  const [broadcastTxVisibility, setBroadcastTxVisibility] = useState<boolean>(
    false
  );

  const closeModal = () => setBroadcastTxVisibility(false);

  const editTx = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTx({
      ...tx,
      [e.target.name]: e.target.value
    });

  const submitTx = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const transactionToBroadcast = createTransaction({
      passphrase: tx.passphrase,
      address: tx.recipient,
      amount: parseFloat(tx.amount) * 100000000 + "",
      secondPassphrase: tx.secondPassphrase
    });
    setSignedTx(JSON.stringify(transactionToBroadcast));
    setBroadcastTxVisibility(true);
  };

  const toggleSecondPassphrase = () => setSecondPassphrase(!secondPassphrase);
  const addPassphrase = (passphrase: string) =>
    setTx({
      ...tx,
      passphrase: passphrase
    });
  const addSecondPassphrase = (passphrase: string) =>
    setTx({
      ...tx,
      secondPassphrase: passphrase
    });

  const validateAddress = () =>
    !tx.recipient || (tx.recipient.length > 1 && isValidAddress(tx.recipient));

  const validateAmount = () =>
    !tx.amount ||
    (!isNaN(+tx.amount) && +tx.amount > 0 && isValidAmount(tx.amount));

  const validatePassphrase = () => !tx.passphrase || tx.passphrase.length > 1;

  const isReadyToGenerate = () => {
    return (
      !!tx.recipient.length &&
      !!tx.amount.length &&
      !!tx.passphrase.length &&
      validateAddress() &&
      validateAmount() &&
      validatePassphrase()
    );
  };

  return (
    <div>
      <div className="columns top20">
        <div className="column is-one-fifth" />
        <div className="column">
          <AddressField parentMethod={editTx} error={!validateAddress()} />
          <div className="field has-text-left">
            <p className="control has-icons-left">
              <input
                className={"input " + (!validateAmount() ? "is-danger" : "")}
                type="text"
                placeholder="Amount"
                name="amount"
                onChange={editTx}
              />
              <span className="icon is-small is-left">Ⱡ</span>
            </p>
          </div>
          <PassphraseField
            icon={"key"}
            parentMethod={addPassphrase}
            error={!validatePassphrase()}
            disabledValidation={disableValidation}
          />
          <div className="field has-text-left">
            <label className="checkbox ">
              <input type="checkbox" onClick={toggleSecondPassphrase} />
              <span className="left10">I have a secondary passphrase</span>
            </label>
          </div>
          {secondPassphrase && (
            <PassphraseField
              icon={"unlock-alt"}
              parentMethod={addSecondPassphrase}
              error={false}
            />
          )}
          <div className="field">
            <p className="control has-text-right">
              <button
                className="button is-success is-outlined"
                onClick={submitTx}
                disabled={!isReadyToGenerate()}
              >
                Generate Transaction
              </button>
            </p>
          </div>
        </div>
        <div className="column is-one-fifth" />
      </div>
      <QRCodeBroadcast
        isModalOpen={broadcastTxVisibility}
        closeModal={closeModal}
        qrCodeValue={signedTx}
      />
    </div>
  );
}
