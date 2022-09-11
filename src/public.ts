import { getPublicKey } from "./lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.handler = async (event : any) => {
  const operation = event.requestContext.httpMethod;

  switch (operation) {
  case 'GET': {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        key: getPublicKey("2022-09-11"),
      }),
    };
  }
  default:
    return {
      statusCode: 400,
      body: "Unsupported method",
    };
  }
};
