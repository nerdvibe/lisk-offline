import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
  icon?: string; // TODO Clarify type
  parentMethod: (passphrase: string) => void;
  error?: boolean;
  errorMessage?: string;
  disabledValidation?: boolean
  label?: string
  inputClass?: string;
}

export default function PassphraseField({
  icon,
  parentMethod,
  error = false,
    errorMessage,
    disabledValidation = false,
    label,
                                          inputClass
}: Props) {
  const [passphraseVisibility, setPassphraseVisibility] = useState<Boolean>(
    false
  );

  const passPassphraseToParent = (e: React.ChangeEvent<HTMLInputElement>) =>
    parentMethod(e.target.value);

  const togglePassphraseVisibility = () =>
    setPassphraseVisibility(!passphraseVisibility);

  return (
    <div className="field has-text-left">
      <p className={`control has-icons-left has-icons-right ${disabledValidation ? "tooltip is-tooltip-warning is-tooltip-right": ""}`} data-tooltip="Passphrase validation disabled">
        <input
          className={`input ${error ? " is-danger " : ""} ${inputClass}`}
          type={passphraseVisibility ? "text" : "password"}
          placeholder={label ? label : "Passphrase"}
          name="passphrase"
          data-lpignore="true"
          autoComplete="off"
          onChange={passPassphraseToParent}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={!!icon ? icon as any : "key"} />
        </span>
        <span
          className="icon is-small is-right is-right-clickable"
          onClick={togglePassphraseVisibility}
        >
          <FontAwesomeIcon icon={passphraseVisibility ? "eye-slash" : "eye"} />
            {disabledValidation? <FontAwesomeIcon icon={"exclamation"} /> : ''}
        </span>
          {
              error && <span className="has-text-warning has-text-right">{errorMessage}</span>
          }

      </p>
    </div>
  );
}
