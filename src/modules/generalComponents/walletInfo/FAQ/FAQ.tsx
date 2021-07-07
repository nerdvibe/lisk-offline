import React from "react";
import FAQel from "./FAQel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { broadcasterUrl } from "../../../../utils/consts";

export default function FAQ() {
  return (
    <span className="no-print">
      <p>
        <strong>
          <br />
          FAQ: <br />
        </strong>
      </p>

      <FAQel title="Why should I register a second passphrase? ">
        <p>
          A second passphrase is a 12-word mnemonic, similar to the first
          passphrase, and can be registered as an additional layer of
          authentication to your Lisk wallet. If registered, it will be required
          to confirm any outgoing transaction.
        </p>
      </FAQel>

      <FAQel title="Why should I initialize the wallet? ">
        <p>
          When someone sends you LSK, they will use the address in order to do
          so. Since the address is an abbreviation of the public key, it is less
          resistant to a collision than the public key is. As soon as you make
          an outgoing transaction, your public key can be recorded on the
          blockchain and, therefore, will be collision-free.
        </p>

        <p>
          In other words, making at least one outgoing transaction from your
          wallet (even to yourself) will even further improve the security of
          your LSK address.
        </p>
      </FAQel>

      <FAQel title="Do I really need to initialize my wallet? ">
        <p>
          Initializing a wallet is nothing else than sending a tx from your
          wallet in order to broadcast your public key to the blockchain.
          <br />
          If you are planning to create an outgoing transaction soon (e.g. a LSK
          transfer or Vote), your wallet will automatically initialize.
          <br />
          Instead if you are NOT planning to create an any outgoing transaction
          anytime soon, you should initialize the wallet.
        </p>
      </FAQel>

      <FAQel title="What happens when I initialize the wallet or register a second passphrase? ">
        <p>
          When you press the icon to initialize your wallet, this software will
          generate a QR code containing a transaction from your wallet to your
          wallet of 0.00001 LSK. The transaction costs 0.1 LSk, but you need to
          have at least 0.00001.
        </p>

        <p>
          <br />
          When you press the icon to create a second passphrase, this software
          will generate a second passphrase. Make sure to save the second
          passphrase and press the button confirm. It will show you QR code
          containing the transaction to confirm your second passphrase. You'll
          need to scan this QR code with {broadcasterUrl} in order to broadcast
          the transaction.
        </p>
      </FAQel>

      <FAQel title="How do can I save this wallet as PDF? ">
        <p>
          Click on the
          <FontAwesomeIcon
            icon={"print"}
            className="right5 left5 dark-on-print"
          />{" "}
          icon and in the printing window, choose to save as PDF.
        </p>
      </FAQel>

      <FAQel title="Is this mainnet or testnet? ">
        <p>
          Both. But you should never use the same passphrase on testnet and
          mainnet, since the networks don't have replay protection.
        </p>
      </FAQel>

      <FAQel title="Can I use this wallet with Lisk Hub or Lisk Nano? ">
        <p>
          Yes. Even if this tool is made to create a wallet in air-gapped PC
          (offline computers), you can access the wallet from Lisk Hub or Lisk
          Nano by using the 12 words passphrase.
        </p>
      </FAQel>

      <FAQel title="How do I scan the QR codes and broadcast the transactions? ">
        <p>Use a smartphone with camera and go to {broadcasterUrl}</p>
      </FAQel>
    </span>
  );
}
