import React, { useState } from "react";

export interface Props {
  nextStep: () => void;
  closeModal: () => void;
  secondPassphrase: string;
}

export default function YourSecondPassphrase({
  nextStep,
  closeModal,
  secondPassphrase
}: Props) {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create a second passphrase</p>
        <button className="delete" aria-label="close" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <h1 className="subtitle">
          This is your second passphrase. It will be requested to sign any
          transaction from now on.
        </h1>
        <strong>
          {secondPassphrase!
            .split(" ")
            .map((word: string, i: number, origArr: string[]) => (
              <span className="passphrase-word" key={i}>
                {word}
                {i === origArr.length - 1 ? "" : " "}
              </span>
            ))}
        </strong>
        <p className="top25">
          Make sure to store this second passphrase safely. If you lose the
          passphrase, you'll lose the ability to transfer your funds. Do you
          want to confirm the operation?
        </p>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-info is-outlined" onClick={closeModal}>
          No, cancel
        </button>
        <button className="button is-success is-outlined" onClick={nextStep}>
          Yes, confirm
        </button>
      </footer>
    </div>
  );
}
