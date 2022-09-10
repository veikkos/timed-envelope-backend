import { cryptico } from '@daotl/cryptico-node'

const bits = 1024;
const secret = "Placeholder-For-The-Secret";

const getDate = (date: string) => {
  const split = date.split("-");
  return new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]));
}

const getDateSecret = (date: Date) => {
  const dateSecret = `${secret}-${date.toISOString()}`;
  return cryptico.generateRSAKey(dateSecret, bits);
}

export const encrypt = (text: string, openDate: string) => {
  const date = getDate(openDate);
  const dateKey = getDateSecret(date);
  const publicKeyString = cryptico.publicKeyString(dateKey);
  const encrypted = cryptico.encrypt(text, publicKeyString, dateKey);
  if (encrypted.status === "success" && "cipher" in encrypted) {
    return `${openDate}_${encrypted.cipher}`;
  } else {
    return "Error in encoding";
  }
};

export const decrypt = (input: string) => {
  const split = input.split("_");
  const date = getDate(split[0]);
  const dateKey = getDateSecret(date);
  const decrypted = cryptico.decrypt(split[1], dateKey);
  if (decrypted.status === "success" && decrypted.signature === "verified" && "plaintext" in decrypted) {
    return decrypted.plaintext;
  } else {
    return "Error in decryption"
  }
};
