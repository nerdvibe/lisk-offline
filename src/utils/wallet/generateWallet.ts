import crypto from "crypto";
import bip39 from "bip39";
//@ts-ignore -> types not available
import mnemonic from "bitcore-mnemonic";
//@ts-ignore -> types not up to date
import nacl_factory from "js-nacl";
//@ts-ignore -> types not available
import bignum from "browserify-bignum";
import {reject} from "q";
import {bool} from "prop-types";

const buffLength = 8;

// https://github.com/bitpay/bitcore-lib/issues/153
// @ts-ignore
if (global._bitcore) delete global._bitcore;

export interface Wallet {
  address?: string;
  entropy?: string;
  hash?: string;
  passphrase?: string;
  privateKey?: string;
  publicKey?: string;
  seed?: string;
  generatedAt?: Date;
  error?: boolean;
  reason?: string;
}

export const generateWallet = (passphrase: string, disabledValidation: boolean = false): Promise<Wallet> => {

  return new Promise((resolve) => {
    const cb = (wallet: Wallet) =>
    {
      if(wallet && (wallet as Wallet).address) {
        return resolve(wallet);
      } else {
        return reject(wallet)
      }
    };

    let onNaclReady = (nacl: any, passphrase: string) => {
      let mnemonicToData = (passphrase: string) => {
        if (!passphrase || (passphrase && !isValidPassphrase(passphrase) && !disabledValidation)) {
          return { error: true, reason: "Passphrase not valid" };
        }

        let hash = crypto
          .createHash("sha256")
          .update(passphrase, "utf8")
          .digest();

        let kp = nacl.crypto_sign_keypair_from_seed(hash);
        let publicKey = new Buffer(kp.signPk);
        let privateKey = new Buffer(kp.signSk);

        let getAddress = (publicKey: Buffer) => {
          let hash = crypto.createHash("sha256").update(publicKey).digest();
          let buff = new Buffer(buffLength);

          for (let i = 0; i < buffLength; i++) {
            buff[i] = hash[7 - i];
          }

          return bignum.fromBuffer(buff).toString() + "L";
        };

        return {
          passphrase,
          hash: hash.toString("hex"),
          address: getAddress(publicKey),
          publicKey: publicKey.toString("hex"),
          privateKey: privateKey.toString("hex"),
          entropy: disabledValidation ? '' : bip39.mnemonicToEntropy(passphrase),
          seed: disabledValidation ? '' : bip39.mnemonicToSeedHex(passphrase),
          generatedAt: new Date()
        };
      };

      return mnemonicToData(passphrase);
    };

    nacl_factory.instantiate((nacl: any) => {
      cb(onNaclReady(nacl, passphrase));
    });

  });

};

/**
 * Generates an array of 16 members equal to given value
 *
 * @param {Number|String} value
 * @returns {Array} - Array of 16 'value's
 */
export const emptyByte = (value: number | string): any[] =>
  Array.apply(null, Array(16)).map(item => value);

/**
 * fills the left side of str with a given padding string to meet the required length
 *
 * @param {String} str - The string to fill with pad
 * @param {String} pad - The string used as padding
 * @param {Number} length  - The final length of the string after adding padding
 * @private
 * @returns {string} padded string
 */
const leftPadd = (str: string, pad: string, length: number) => {
  let paddedStr = str;
  while (paddedStr.length < length) paddedStr = pad + paddedStr;
  return paddedStr;
};

/**
 * Resets previous settings and creates a step with a random length between 1.6% to 3.2%
 */
const init = (rand = Math.random()) => {
  let step = (160 + Math.floor(rand * 160)) / 100;
  step = step >= 0.01 ? step : 0.1 + step * 5;
  return {
    step,
    percentage: 0,
    seed: emptyByte("00"),
    byte: emptyByte(0)
  };
};

/**
 * - From a zero byte:
 * - Removes all the 1s and replaces all the 1s with their index
 * - Creates a random number with the length of resulting array (pos)
 * - sets the bit in the pos position
 * - creates random byte using crypto and assigns that to seed in the
 *    position of pos
 * - Repeats this until the length of the given byte is zero.
 *
 * @param {Array} byte - Array of 16 numbers
 * @param {Array} seed - Array of 16 hex numbers in String format
 * @param {Number} percentage
 * @param {Number} step
 *
 * @returns {number[]} The input array whose member is pos is set
 */
export const generateSeed = (
  { byte, seed, percentage, step } = init(),
  rand = Math.random()
) => {
  const available = byte
    .map((bit, index) => (!bit ? index : null))
    .filter(bit => bit !== null);
  const seedIndex =
    available.length > 0
      ? available[parseInt(rand * available.length + "", 10)]
      : parseInt(rand * byte.length + "", 10);

  const content = leftPadd(crypto.randomBytes(1)[0].toString(16), "0", 2);

  return {
    seed: seed.map((item, idx) => (idx === seedIndex ? content : item)),
    byte:
      available.length > 0
        ? byte.map((item, idx) => (idx === seedIndex ? 1 : item))
        : emptyByte(0),
    percentage: percentage + step,
    step
  };
};

/**
 * Generates a passphrase from a given seed array using mnemonic
 *
 * @param {string[]} seed - An array of 16 hex numbers in string format
 * @returns {string} The generated passphrase
 */
export const generatePassphrase = ({ seed }: { seed: string[] }) =>
  new mnemonic(new Buffer(seed.join(""), "hex")).toString();

/**
 * Generates a passphrase using mnemonic
 *
 * @returns string The generated passphrase
 */
export const generateMnemonic = () =>
  new mnemonic().phrase;

/**
 * Checks if passphrase is valid using mnemonic
 *
 * @param {string} passphrase
 * @returns {bool} isValidPassphrase
 */
export const isValidPassphrase = (passphrase: string) => {
  const normalizedValue = passphrase.replace(/ +/g, " ").trim();
  let isValid;
  try {
    isValid =
      normalizedValue.split(" ").length >= 12 &&
      mnemonic.isValid(normalizedValue);
  } catch (e) {
    // If the mnemonic check throws an error, we assume that the
    // passphrase being entered isn't valid
    console.log(e);
    isValid = false;
  }
  return isValid;
};

export const inDictionary = (word:string) =>
    mnemonic.Words.ENGLISH.indexOf(word) !== -1;

export const getPassphraseValidationErrors = (passphrase: string) => {
  const passphraseArray = passphrase.trim().split(' ');

  const partialPassphraseError:string[] = [];

  const invalidWords = passphraseArray.filter((word) => {
    const isNotInDictionary = !inDictionary(word);
    partialPassphraseError[passphraseArray.indexOf(word)] = word;
    return isNotInDictionary;
  });

  let validationError = 'Passphrase is not valid';

  if (passphraseArray.length < 12) {
    validationError = `Passphrase should have 12 words, entered passphrase has ${passphraseArray.length}`;
  } else if (invalidWords.length > 0) {
    validationError = `Please check the following words: ${invalidWords.join(" ")}`;
  }

  return validationError;
};
