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
    passphrase,
    secondPassphrase,
    data
  };
  console.log(secondPassphrase);
  if (!secondPassphrase || !secondPassphrase.length) {
    // @ts-ignore
    delete transaction.secondPassphrase;
  }
  if (!data || !data.length) {
    // @ts-ignore
    delete transaction.data;
  }

  console.log(transaction);
  return transfer(transaction);
};
