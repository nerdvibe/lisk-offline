import React, { useState } from "react";
import PassphraseField from "../../generalComponents/PassphraseField";
import "./style.scss";

export interface Props {
  nextStep: () => void;
  closeModal: () => void;
  setPassphrase: (p: string) => void;
  setSecondPassphrase: (p: string) => void;
}

export default function Passphrases({
  nextStep,
  closeModal,
  setPassphrase,
  setSecondPassphrase
}: Props) {
  const [hasSecondPassphrase, setHasSecondPassphrase] = useState<boolean>(
    false
  );
  const toggleSecondPassphrase = () =>
    setHasSecondPassphrase(!hasSecondPassphrase);

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Cast votes</p>
        <button className="delete" aria-label="close" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <h1 className="subtitle bottom25">
          In order to sign the votes transaction you need to type the
          passphrase(s)
        </h1>
        <PassphraseField
          parentMethod={setPassphrase}
          label={"First passphrase"}
          inputClass={"passphrase-modal"}
        />
        <div className="field has-text-right">
          <label className="checkbox ">
            <input type="checkbox" onClick={toggleSecondPassphrase} />
            <span className="left10" style={{ color: "#636a77" }}>
              I have a secondary passphrase
            </span>
          </label>
        </div>
        {hasSecondPassphrase && (
          <PassphraseField
            parentMethod={setSecondPassphrase}
            label={"Second passphrase"}
            icon={"unlock-alt"}
            inputClass={"passphrase-modal"}
          />
        )}
      </section>
      <footer className="modal-card-foot">
        <button className="button is-info is-outlined" onClick={closeModal}>
          Cancel
        </button>
        <button className="button is-success is-outlined" onClick={nextStep}>
          Let's broadcast!
        </button>
      </footer>
    </div>
  );
}
