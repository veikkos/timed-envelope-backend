import { decrypt, encrypt } from "./lib";

const command = process.argv[2];

switch(command) {
case "encrypt": {
  const res = encrypt(process.argv[3], process.argv[4]);
  console.log(res);
  break;
}
case "decrypt": {
  const res = decrypt(process.argv[3]);
  console.log(res);
  break;
}
}
