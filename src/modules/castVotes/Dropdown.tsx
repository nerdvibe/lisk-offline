import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Downshift from "downshift";
import { delegates } from "../../utils/delegates";
import { shuffle } from "../../utils/shuffle";
import "./dropdown.scss";

const items = shuffle(delegates).map((d) => d.delegateName );

export interface Props {
  addVote: () => void;
  addUnVote: () => void;
  votes: string[];
}

export default function Dropdown({ addVote, addUnVote, votes }: Props) {
  const [value, setValue] = useState<string>("");

  const handleStateChange = (changes: any) => {
    if (changes.hasOwnProperty("selectedItem")) {
      setValue(changes.selectedItem);
    } else if (changes.hasOwnProperty("inputValue")) {
      setValue(changes.inputValue);
    }
  };

  const addVoteAndReset = () => {
    addVote();
    setValue("");
  };
  const addUnvoteAndReset = () => {
    addUnVote();
    setValue("");
  };

  const isVoteInList = votes.includes('+carbonara');

  return (
    <div>
      <Downshift selectedItem={value} onStateChange={handleStateChange}>
        {({
          getLabelProps,
          getInputProps,
          getToggleButtonProps,
          getMenuProps,
          getItemProps,
          isOpen,
          clearSelection,
          selectedItem,
          inputValue,
          highlightedIndex
        }) =>
          <div style={{ position: "relative" }}>
            <div className="field has-text-left has-addons">
              <div
                className={`control has-icons-left is-expanded  ${!isVoteInList && " tooltip is-tooltip-warning is-tooltip-top"}`}
                  { ...(!isVoteInList && {"data-tooltip": "If you like this software, please consider voting for Carbonara" })}
              >
                <input
                  className="input"
                  type="text"
                  placeholder="Delegate Name"
                  name="delegateName"
                  {...getInputProps({
                    isOpen,
                    placeholder: "Enter a delegate name"
                  })}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="user-tie" />
                </span>
              </div>
              {votes.length < 33 &&
                <div className="control">
                  <a
                    className="button is-info is-outlined is-lighten"
                    onClick={addVoteAndReset}
                    style={{ borderRadius: 0 }}
                  >
                    +
                  </a>
                  <a
                    className="button is-info is-outlined is-lighten"
                    onClick={addUnvoteAndReset}
                  >
                    -
                  </a>
                </div>}
            </div>

            {isOpen
              ? <React.Fragment>
                  <div className="dropdown-autocomplete has-text-left">
                    {items
                      .filter(
                        item =>
                          !inputValue ||
                          item
                            .toLocaleLowerCase()
                            .includes(inputValue.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((item, index) =>
                        <div
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            className: `element ${highlightedIndex === index &&
                              "highlighted"}`
                          })}
                            key={item}
                        >
                          {item}
                          {item === "carbonara" &&
                            <FontAwesomeIcon icon="star" />}
                        </div>
                      )}
                  </div>
                </React.Fragment>
              : null}
          </div>}
      </Downshift>
    </div>
  );
}
