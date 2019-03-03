import { transfer } from "@liskhq/lisk-transactions/";
import { TransferInputs } from "@liskhq/lisk-transactions/dist-node/0_transfer";

export interface CreateTransactionInputs {
  passphrase: string;
  address: string;
  amount: string;
  secondPassphrase?: string;
  data?: string;
}

export const createTransaction = ({
  passphrase,
  address,
  amount,
  secondPassphrase,
  data
}: CreateTransactionInputs) => {
  const transaction: TransferInputs = {
    amount,
    recipientId: address,
    passphrase
  };
  if (secondPassphrase) {
    // @ts-ignore
    transaction.secondPassphrase = secondPassphrase;
  }
  if (data) {
    // @ts-ignore
    transaction.data = data;
  }

  return transfer(transaction);
};
