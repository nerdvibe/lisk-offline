import React, { useState } from "react";
import {generateMnemonic, createSecondPassphrase} from "../../../utils/wallet";
import Intro from "./Intro";
import YourSecondPassphrase from "./YourSecondPassphrase";
import QRCodeBroadcast from "./QRCode";

export interface Props {
    passphrase: string;
    isModalOpen: boolean;
    close: () => void
}

export default function CreateSecondPassphraseModal(
    { passphrase, close, isModalOpen }: Props
) {
    const [step, setStep] = useState<number>(0);
    const [secondPassphrase, setSecondPassphrase] = useState<string>(generateMnemonic);

    const closeModal = () => {
        console.log('called CloseModal');
        setStep(0);
        close();
    };
    const nextStep = () => {
      setStep(step + 1);
    };

    const txToBroadcast = createSecondPassphrase(passphrase, secondPassphrase);

    // Use 3 switch steps. 1 intro, 2 new passphrase, 3 QR code

    return (
        <div className={`modal ${isModalOpen ? "is-active" : ''} is-clipped`}>
            <div className="modal-background"></div>
            <div className="is-clipped">
                {step === 0 && (<Intro nextStep={nextStep} closeModal={closeModal}/>)}
                {step === 1 && (<YourSecondPassphrase nextStep={nextStep} closeModal={closeModal} secondPassphrase={secondPassphrase}/>)}
                {step === 2 && (<QRCodeBroadcast nextStep={nextStep} closeModal={closeModal} qrCodeValue={JSON.stringify(txToBroadcast)}/>)}
            </div>
        </div>
    );
}
