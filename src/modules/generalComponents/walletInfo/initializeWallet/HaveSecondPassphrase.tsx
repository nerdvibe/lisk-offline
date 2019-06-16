import React from "react";
import image from "./img/undraw_science";

export interface Props {
  nextStep: () => void;
  closeModal: () => void;
}

export default function HaveSecondPassphrase({ nextStep, closeModal }: Props) {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Initialize Wallet</p>
        <button className="delete" aria-label="close" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <h1 className="subtitle">
          Do you have a second passphrase or you already made an outgoing
          transaction/vote?{" "}
        </h1>
        <img src={image} alt="" style={{ width: "277px" }} />
        <p>
          {" "}
          If you have already a second passphrase or you already made an
          outgoing transaction or vote, you don't need to initialize the wallet
          since the wallet is already initialized. <br /> Initializing the
          wallet has a cost of 0.1 LSK
        </p>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-info is-outlined" onClick={closeModal}>
          I have a second passphrase
        </button>
        <button className="button is-success is-outlined" onClick={nextStep}>
          Initialize the wallet
        </button>
      </footer>
    </div>
  );
}
