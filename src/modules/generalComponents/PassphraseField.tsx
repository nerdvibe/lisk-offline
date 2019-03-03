import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
    icon: string; // TODO Clarify type
    parentMethod: (passphrase: string) => void
    error: boolean;
}

export default function PassphraseField({ icon, parentMethod, error }: Props) {
  const [passphraseVisibility, setPassphraseVisibility] = useState<Boolean>(
    false
  );

  const passPassphraseToParent = (e: React.ChangeEvent<HTMLInputElement>) =>
      parentMethod(e.target.value);

  const togglePassphraseVisibility = () =>
    setPassphraseVisibility(!passphraseVisibility);

  return (

          <div className="field has-text-left">
            <p className="control has-icons-left has-icons-right">
              <input
                  className={"input" + (error ? " is-danger" : "")}
                  type={passphraseVisibility ? "text" : "password"}
                  placeholder="Passphrase"
                  name="passphrase"
                  data-lpignore="true"
                  autoComplete="off"
                  onChange={passPassphraseToParent}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={icon as any | "key"} />
              </span>
              <span
                className="icon is-small is-right is-right-clickable"
                onClick={togglePassphraseVisibility}
              >
                <FontAwesomeIcon
                  icon={passphraseVisibility ? "eye-slash" : "eye"}
                />
              </span>
            </p>
          </div>
  );
}
