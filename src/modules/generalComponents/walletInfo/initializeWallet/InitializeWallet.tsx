import React, { useState } from "react";
import Intro from "./Intro";
import QRCodeBroadcast from "./QRCodeBroadcast";
import HaveSecondPassphrase from "./HaveSecondPassphrase";
import { initializeWallet } from "../../../../utils/wallet";

export interface Props {
  isModalOpen: boolean;
  close: () => void;
  passphrase: string;
  address: string;
}

export default function InitializeWallet({
  close,
  isModalOpen,
  passphrase,
  address
}: Props) {
  const [step, setStep] = useState<number>(0);

  const closeModal = () => {
    setStep(0);
    close();
  };
  const nextStep = () => {
    if (step === 2) {
      return closeModal();
    }
    setStep(step + 1);
  };

  const txToBroadcast = initializeWallet(passphrase, address);

  return (
    <div className={`modal ${isModalOpen ? "is-active" : ""} is-clipped`}>
      <div className="modal-background" />
      <div className="is-clipped">
        {step === 0 && <Intro nextStep={nextStep} closeModal={closeModal} />}
        {step === 1 && (
          <HaveSecondPassphrase nextStep={nextStep} closeModal={closeModal} />
        )}
        {step === 2 && (
          <QRCodeBroadcast
            nextStep={nextStep}
            closeModal={closeModal}
            qrCodeValue={JSON.stringify(txToBroadcast)}
          />
        )}
      </div>
    </div>
  );
}
