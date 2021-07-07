import React from "react";
import image from "./img/undraw_following";

export interface Props {
  nextStep: () => void;
  closeModal: () => void;
}

export default function Intro({ nextStep, closeModal }: Props) {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Cast votes</p>
        <button className="delete" aria-label="close" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <h1 className="subtitle">Okay let's create cast your votes. </h1>
        <img src={image} alt="" style={{ width: "277px" }} />
        <h1 className="subtitle">
          {" "}
          Do you have at least 1 LSK in this wallet?{" "}
        </h1>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-info is-outlined" onClick={closeModal}>
          No, cancel
        </button>
        <button className="button is-success is-outlined" onClick={nextStep}>
          Yes, let's vote
        </button>
      </footer>
    </div>
  );
}
