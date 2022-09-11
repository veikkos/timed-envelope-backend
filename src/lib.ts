import { cryptico } from '@daotl/cryptico-node'

const bits = 1024;
const secret = "Placeholder-For-The-Secret";

const getDate = (date: string) => {
  const split = date.split("-");
  return new Date(Date.UTC(Number(split[0]), Number(split[1]) - 1, Number(split[2])));
}

const getDateSecret = (date: Date) => {
  const dateSecret = `${secret}-${date.toISOString()}`;
  return cryptico.generateRSAKey(dateSecret, bits);
}

export const getPublicKey = (openDate: string) => {
  const date = getDate(openDate);
  const dateKey = getDateSecret(date);
  return cryptico.publicKeyString(dateKey);
};

export const getPrivateKey = (openDate: string) => {
  const date = getDate(openDate);
  const now = new Date();
  const dateNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
    now.getUTCDate()));
  if (dateNow >= date) {
    const dateKey = getDateSecret(date);
    return { key: JSON.stringify(dateKey.toJSON()) };
  } else {
    return { error:"It's not yet time" }
  }
};
