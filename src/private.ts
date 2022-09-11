import { getPrivateKey } from "./lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.handler = async (event : any) => {
  const operation = event.requestContext.httpMethod;

  switch (operation) {
  case 'GET': {
    const privateKey = getPrivateKey("2022-09-11");
    if (privateKey.key) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "success",
          key: privateKey.key,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: "error",
          message: privateKey.error,
        }),
      };
    }
  }
  default:
    return {
      statusCode: 400,
      body: "Unsupported method",
    };
  }
};
