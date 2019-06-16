import React, {useState} from "react";
import QRCode from "qrcode.react"
import {broadcasterUrl} from "../../../utils/consts";

export interface Props {
    nextStep: () => void;
    closeModal: () => void;
    qrCodeValue: string[];
}

export default function QRCodeBroadcast(
    { nextStep, closeModal, qrCodeValue }: Props
) {
    const [currQRCode, setCurrQRCode] = useState<number>(0);

    const nextQRCode = () => {
        currQRCode < qrCodeValue.length - 1 ?  setCurrQRCode(currQRCode + 1) :  setCurrQRCode(qrCodeValue.length - 1);
    };
    const prevQRCode = () => {
        currQRCode > 0 ? setCurrQRCode(currQRCode - 1) : setCurrQRCode(0);
    };
    const isMultiQRCode = qrCodeValue.length > 1;

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Cast votes</p>
                <button className="delete" aria-label="close" onClick={closeModal}/>
            </header>
            <section className="modal-card-body">
                <h1 className="subtitle">Okay now broadcast your transaction by scanning the following QR Code{isMultiQRCode && 's'}.</h1>
                {isMultiQRCode && <h2 className="subtitle">{`${currQRCode + 1} of ${qrCodeValue.length} QRcodes`}</h2>}

                <div>
                    <QRCode value={qrCodeValue[currQRCode]} size={150} level={"L"}/>

                </div>
                {isMultiQRCode && <div>
                        {<button className="button is-info is-outlined" onClick={prevQRCode} {...(!(currQRCode > 0) && {disabled: true})}>{"<<"} QR code</button>}
                        {<button className="button is-info is-outlined"  onClick={nextQRCode} {...(!(currQRCode < qrCodeValue.length - 1) && {disabled: true})}>QR code {">>"}</button>}
                    </div>
                }

                <p className="top25">The votes are not valid until {isMultiQRCode && <span><strong>all</strong> the QR codes have been scanned and </span>} the tx is broadcasted. To broadcast the TX scan the QR code with {broadcasterUrl}</p>
                <div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-info is-outlined" onClick={closeModal}>Cancel</button>
                <button className="button is-success is-outlined" onClick={nextStep}>Done! Transaction broadcasted</button>
            </footer>
        </div>
    );
}
