import React from "react";
import QRCode from "qrcode.react"
import {broadcasterUrl} from "../../utils/consts";

export interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
    qrCodeValue: string;
}

export default function QRCodeBroadcast(
    { isModalOpen, closeModal, qrCodeValue }: Props
) {
    return (
        <div className={`modal ${isModalOpen ? "is-active" : ''} is-clipped`}>
            <div className="modal-background"></div>
            <div className="is-clipped">
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Broadcast Transaction</p>
                <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
                <h1 className="subtitle">Broadcast your transaction by scanning the following QR Code. Fee: 0.1 LSK</h1>
                <QRCode value={qrCodeValue}/>
                <p className="top25">The transaction is not valid until the transaction is broadcasted. To broadcast the TX scan the QR code with {broadcasterUrl}</p>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success is-outlined" onClick={closeModal}>Done! Transaction broadcasted</button>
            </footer>
        </div>
        </div>
        </div>
    );
}
