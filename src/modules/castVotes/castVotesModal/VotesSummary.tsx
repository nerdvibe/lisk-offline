import React, { useState } from "react";

export interface Props {
  nextStep: () => void;
  closeModal: () => void;
  votes: string[];
}

export default function VotesSummary({ nextStep, closeModal, votes }: Props) {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Cast votes</p>
        <button className="delete" aria-label="close" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <h1 className="subtitle">Just to make sure, this are the votes:</h1>
        <div className="field is-grouped is-grouped-multiline top15">
          {votes.map((name: string) => (
            <div className="control" key={name}>
              <div className="tags">
                <span
                  className={`tag ${
                    name[0] === "-" ? "is-danger" : "is-success"
                  }`}
                >
                  {name.substring(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="top25">Everything looks correct?</p>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-info is-outlined" onClick={closeModal}>
          No, cancel
        </button>
        <button className="button is-success is-outlined" onClick={nextStep}>
          Yes, everything is correct
        </button>
      </footer>
    </div>
  );
}
