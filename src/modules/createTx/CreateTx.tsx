import React from "react";
import CreateTxForm from "./CreateTxForm";

export default function CreateTx() {
    return (
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">Create new transaction</h1>
                <p>Here you can create your transaction and then broadcast it online with the Smartphone.</p>
                <CreateTxForm/>
            </div>
        </div>
    );
}
