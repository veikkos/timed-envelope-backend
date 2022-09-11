import { APIGatewayProxyEvent } from "aws-lambda";
import { getPrivateKey } from "./lib";

exports.handler = async (event : APIGatewayProxyEvent) => {
  const method = event.requestContext.httpMethod;

  switch (method) {
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
      body: JSON.stringify({
        status: "error",
        message: "Unsupported method",
      }),
    };
  }
};
