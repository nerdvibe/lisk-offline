import React, { useState } from "react";
import Intro from "./Intro";
import QRCodeBroadcast from "./QRCodeBroadcast";
import Passphrases from "./Passphrases";
import VotesSummary from "./VotesSummary";
import {delegates} from "../../../utils/delegates";
import {generateVotes} from "../../../utils/wallet/generateVotes";
import {QRChunker} from "../../../utils/QRChunker";

export interface Props {
    isModalOpen: boolean;
    close: () => void
    votes: string[]
}

export default function CastVotesModal(
    { close, isModalOpen, votes }: Props
) {
    const [step, setStep] = useState<number>(0);
    const [passphrase, setPassphrase] = useState<string>('');
    const [secondPassphrase, setSecondPassphrase] = useState<string>('');

    const closeModal = () => {
        setStep(0);
        close();
    };
    const nextStep = () => {
        if(step === 3) {
            return closeModal()
        }
      setStep(step + 1);
    };

    const convertDelegatesToPubKey = () => {
        const pkToVote: string[] = [];
        const pkToUnvote: string[] = [];

        votes.forEach((vote) => {
            let delegateEl = delegates.find((d) => d.delegateName.toLowerCase() === vote.toLowerCase().substring(1));
                const pk = !!delegateEl ? delegateEl.pk : vote.substring(1);

            if(vote[0] === "+") {
                return pkToVote.push(pk)
            } else if (vote[0] === "-") {
                return pkToUnvote.push(pk)
            }
        });
        return {
            votes: pkToVote,
            unvotes: pkToUnvote,
            passphrase,
            secondPassphrase
        }
    };


    const txToBroadcast = JSON.stringify(generateVotes(convertDelegatesToPubKey()));
    const chunkedQRCode = QRChunker(txToBroadcast);

    return (
      <div>
        <div className={`modal ${isModalOpen ? "is-active" : ''} is-clipped has-text-centered`}>
            <div className="modal-background"></div>
            <div className="is-clipped">
                {step === 0 && (<Intro nextStep={nextStep} closeModal={closeModal}/>)}
                {step === 1 && (<VotesSummary nextStep={nextStep} closeModal={closeModal} votes={votes}/>)}
                {step === 2 && (<Passphrases nextStep={nextStep} closeModal={closeModal} setPassphrase={setPassphrase} setSecondPassphrase={setSecondPassphrase}/>)}
                {step === 3 && (<QRCodeBroadcast nextStep={nextStep} closeModal={closeModal} qrCodeValue={chunkedQRCode}/>)}
            </div>
        </div>
      </div>
    );
}
