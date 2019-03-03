import React, {ReactNode, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
    title: string;
    children: ReactNode
}

export default function FAQel({title, children}: Props) {

    const [showSecondPassphrase, setShowSecondPassphrase] = useState<boolean>(false);
    const toggleShowSecondPassphrase = () => setShowSecondPassphrase(!showSecondPassphrase);

    return (
        <span>
                <a onClick={toggleShowSecondPassphrase}>
                    {showSecondPassphrase ? <FontAwesomeIcon icon="caret-down" /> :  <FontAwesomeIcon icon="caret-right" />}
                    {title} <br/></a>

                <div className={`top5 left20 bottom10 ${showSecondPassphrase ? "" : "is-hidden"}`}>
                    {children}
                </div>
        </span>
    );
}
