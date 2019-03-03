import React from "react";
import QRCode from "qrcode.react"

export interface Props {
    nextStep: () => void;
    closeModal: () => void;
    qrCodeValue: string;
}

export default function QRCodeBroadcast(
    { nextStep, closeModal, qrCodeValue }: Props
) {
    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Initialize Wallet</p>
                <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
                <h1 className="subtitle">Okay now broadcast your transaction by scanning the following QR Code.</h1>
                <QRCode value={qrCodeValue}/>
                <p className="top25">The wallet is not initialized until the tx is broadcasted. To broadcast the TX scan the QR code with TODO: URL</p>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-info is-outlined" onClick={closeModal}>Cancel</button>
                <button className="button is-success is-outlined" onClick={nextStep}>Done! Transaction broadcasted</button>
            </footer>
        </div>
    );
}
