import React  from "react";
import image from "./img/undraw_science"

export interface Props {
    nextStep: () => void;
    closeModal: () => void;
}

export default function Intro(
    { nextStep, closeModal }: Props
) {
    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Initialize wallet</p>
                <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
                <h1 className="subtitle">Okay let's initialize your new wallet.  </h1>
                <img src={image} alt="" style={{width: "277px"}}/>
                <h1 className="subtitle"> Do you have at least 0.2 LSK in this wallet? </h1>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-info is-outlined" onClick={closeModal}>No, cancel</button>
                <button className="button is-success is-outlined" onClick={nextStep}>Yes, initialize the wallet</button>
            </footer>
        </div>
    );
}
