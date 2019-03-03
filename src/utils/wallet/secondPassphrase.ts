import {registerSecondPassphrase} from "@liskhq/lisk-transactions/";

export const createSecondPassphrase = (passphrase: string, secondPassphrase: string) => {

    return registerSecondPassphrase({
        passphrase,
        secondPassphrase
    })
};
