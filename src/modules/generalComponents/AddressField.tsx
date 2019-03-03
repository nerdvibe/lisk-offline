import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
    parentMethod: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: boolean
}

export default function AddressField({ parentMethod, error }: Props) {
    const passAddressToParent = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toUpperCase();
        parentMethod(e);
    };

    return (

        <div className="field has-text-left">
            <p className="control has-icons-left has-icons-right">
                <input
                    className={"input uppercased" + (error ? ' is-danger' : '')}
                    type="text"
                    placeholder="Recipient"
                    name="recipient"
                    onChange={passAddressToParent}
                />
                <span className="icon is-small is-left">
                <FontAwesomeIcon icon="exchange-alt" />
              </span>
            </p>
        </div>
    );
}
