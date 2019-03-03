import React  from "react";
import PassphraseField from "../../generalComponents/PassphraseField";

export interface Props {
    nextStep: () => void;
    closeModal: () => void;
    setSecondPassphrase: () => void;
}

export default function SecondPassphrase({ nextStep, closeModal, setSecondPassphrase }: Props) {

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Cast votes></p>
                <button className="delete" aria-label="close" onClick={closeModal} />
            </header>
            <section className="modal-card-body">
                <h1 className="subtitle">Do you have a second passphrase?</h1>
                <p className="top25">If you don't have a second passphrase, you can skip this step.</p>
            </section>
            <PassphraseField parentMethod={setSecondPassphrase}/>
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
