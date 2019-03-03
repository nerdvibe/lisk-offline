import { castVotes } from "@liskhq/lisk-transactions/";

export interface generateVotes {
    votes: string[];
    unvotes: string[];
    passphrase: string;
    secondPassphrase: string;
}

export const generateVotes = (voteObj: generateVotes) => {
    return castVotes(voteObj);
};
