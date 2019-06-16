import React, { useState } from "react";
import Dropdown from "./Dropdown";
import CastVotesModal from "./castVotesModal/CastVotesModal";

export interface Props {
  network: 'Testnet' | 'Mainnet';
}

export const CastVotes = ({network}: Props) => {
  const [votes, setVotes] = useState<string[]>([]);
  const [castVotesVisibility, setCastVotesVisibility] = useState<boolean>(false);
  const [errorPK, setErrorPK] = useState<string | null>(null);

  const openCastVotesModal = () => setCastVotesVisibility(true);
  const closeCastVotesModal = () => setCastVotesVisibility(false);

  const addVote = () => {
    pushVote("+");
  };
  const addUnVote = () => {
    pushVote("-");
  };
  const pushVote = (kind: "+" | "-", delegateName?: string) => {
    if (votes.length >= 33) {
      return;
    }
    const delegate = !delegateName ? (document.getElementsByName(
      "delegateName"
    )[0] as HTMLInputElement).value : delegateName;

    if (votes.includes(`+${delegate}`) || votes.includes(`-${delegate}`)) {
      console.log(0);
      const index =
        (votes.indexOf(`+${delegate}`) + 1 ||
          votes.indexOf(`-${delegate}`) + 1) - 1;
      const votesToEdit = [...votes];
      votesToEdit[index] = `${kind}${delegate}`;
      setVotes(votesToEdit);
      return;
    }
    if (delegate.length) {
      console.log(1, `${kind}${delegate}`);
      const votesToAdd = [...votes, `${kind}${delegate}`];
      setVotes(votesToAdd);
    }
  };

  const removeVoteFromArray = (e: any) => {
    const delegate = e.currentTarget.getAttribute("data-delegate");
    const newVotes = votes.filter(c => c !== delegate);
    setVotes(newVotes);
  };

  // Special button for development to pick 33 random delegates -> Helpful for debugging
  // const fill = () => {
  //   const finalVotes = [];
  //   for (let i = 0; i < 33; i++) {
  //     if(i % 2 == 0) {
  //       finalVotes.push('+'+mainnetDelegates[i].delegateName);
  //
  //     } else {
  //       finalVotes.push('-'+mainnetDelegates[i].delegateName);
  //     }
  //   }
  //   setVotes(finalVotes)
  // };

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">Cast Votes:</h1>
        <h2 className="subtitle bottom0">
          You can choose up to 33 votes (vote/unvote) in one transaction
        </h2>
        <p>If the delegate is not available in the dropdown, then please use the public key of the delegate.</p>
        {/*<button onClick={fill}> fill </button>*/}
        <div className="columns top20">
          <div className="column is-one-fifth" />
          <div className="column">
            <Dropdown addVote={addVote} addUnVote={addUnVote} votes={votes} network={network} />
            <div>
              <div className="field is-grouped is-grouped-multiline top15">
                {votes.map((name: string, i: number) =>
                  <div className="control" key={name}>
                    <div className="tags has-addons">
                      <span
                        className={`tag ${name[0] === "-"
                          ? "is-danger"
                          : "is-success"}`}
                      >
                        {name.substring(1)}
                      </span>
                      <a
                        className="tag is-delete"
                        onClick={removeVoteFromArray}
                        data-delegate={name}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="has-text-danger" style={{margin: '1rem'}}> {errorPK}</div>
            {!!votes.length && !errorPK &&
              <div className="field">
                <p className="control has-text-right">
                  <button
                    className="button is-info is-outlined tooltip is-tooltip-right is-tooltip-right-desktop top20"
                    data-tooltip="Fee 1 LSK"
                    onClick={openCastVotesModal}
                  >
                    Submit {votes.length} votes
                  </button>
                </p>
              </div>}
          </div>
          <div className="column is-one-fifth" />
        </div>
      </div>
      <CastVotesModal isModalOpen={castVotesVisibility} close={closeCastVotesModal} votes={votes} network={network} setErrorPK={setErrorPK}/>
    </div>
  );
}
