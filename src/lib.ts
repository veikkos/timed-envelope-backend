import { cryptico } from '@daotl/cryptico-node'

const bits = 1024;
const secret = process.env.SECRET;

const getDateSecret = (date: Date) => {
  const dateSecret = `${secret}-${date.toISOString()}`;
  return cryptico.generateRSAKey(dateSecret, bits);
}

export const getPublicKey = (openDate: string) => {
  const date = new Date(openDate);
  const dateKey = getDateSecret(date);
  return cryptico.publicKeyString(dateKey);
};

export const getPrivateKey = (openDate: string) => {
  const date = new Date(openDate);
  const now = new Date();
  if (now >= date) {
    const dateKey = getDateSecret(date);
    return { key: dateKey.toJSON() };
  } else {
    return { error: "It's not yet time" }
  }
};
