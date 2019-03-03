import {transfer} from "@liskhq/lisk-transactions/";

export const initializeWallet = (passphrase: string, address: string) => {
    return transfer({
        amount: '1',
        recipientId: address,
        passphrase,
    });
};
