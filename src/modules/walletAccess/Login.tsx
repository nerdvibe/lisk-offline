import React, { useState } from "react";
import PassphraseField from "../generalComponents/PassphraseField";
import {
    generateWallet,
    getPassphraseValidationErrors,
    isValidPassphrase
} from "../../utils/wallet";
import {Passphrase} from "./WalletAccess";

export interface Error {
    error: boolean;
    message: string;
}

export interface Props {
    disableValidation: boolean;
    setWallet: (passphrase: Passphrase) => void
}

export default function Login({ disableValidation, setWallet }: Props) {

    const [passphrase, setPassphrase] = useState<string>("");
    const [error, setError] = useState<Error>({ error: false, message: "" });

    const passphraseIsValidated = (passphraseInput: string) => {
        if (disableValidation) {
            setError({ error: false, message: "" });
            return true;
        }
        const isValid = isValidPassphrase(passphraseInput);
        let message = "";
        if (!isValid) {
            message = getPassphraseValidationErrors(passphraseInput);
        }
        setError({ error: !isValid, message });
        return isValid;
    };
    const setPassphraseAndValidate = async (passphraseInput: string) => {
        setPassphrase(passphraseInput);
        if(!disableValidation) {
            passphraseIsValidated(passphraseInput);
        } else {
            setError({ error: false, message: '' });
        }
    };

    const submitPassphrase = async() => {
        let wallet;

        try {
            wallet = await generateWallet(passphrase, disableValidation);
            delete(wallet.generatedAt);
        } catch (e) {
            setError({ error: true, message: 'Failed to calculate the wallet.' });
            throw new Error(error.message);
        }

        setWallet({
            wallet
        })
    };

    return (
        <React.Fragment>
                <h1 className="title">Access your wallet</h1>
                <p>Here you can retrieve the info about your wallet:</p>
                <div>
                    <div className="columns top20">
                        <div className="column is-one-fifth" />
                        <div className="column">
                            <PassphraseField
                                icon={"key"}
                                parentMethod={setPassphraseAndValidate}
                                error={error.error}
                                errorMessage={error.message}
                                disabledValidation={disableValidation}
                            />

                            <div className="field">
                                <p className="control has-text-right">
                                    <button
                                        className="button is-success is-outlined"
                                        onClick={submitPassphrase}
                                        disabled={error.error || !passphrase.length}
                                    >
                                        Access Wallet
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="column is-one-fifth" />
                    </div>
                </div>
        </React.Fragment>
    );
}
