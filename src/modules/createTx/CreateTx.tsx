import React, { useState } from "react";
import CreateTxForm from "./CreateTxForm";

export interface Tx {
    recipient: string;
    amount: string;
    passphrase: string;
    secondPassphrase: string;
    [key: string]: string | number;
}

export default function CreateTx() {

    const [tx, setTx] = useState<Tx>({
        recipient: '',
        amount: '',
        passphrase: '',
        secondPassphrase: ''
    });

    return (
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">Create new transaction</h1>
                <p>Here you can create your transaction and then broadcast it online with the Smartphone.</p>
                <CreateTxForm tx={tx} setTx={setTx}/>
            </div>
        </div>
    );
}
