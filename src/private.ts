import { APIGatewayProxyEvent } from "aws-lambda";
import { responseHeaders } from "./headers";
import { getPrivateKey } from "./lib";

exports.handler = async (event : APIGatewayProxyEvent) => {
  const method = event.requestContext.httpMethod;
  const date = event.pathParameters?.["date"];

  if (!date) {
    return {
      statusCode: 400,
      headers: responseHeaders(),
      body: JSON.stringify({
        status: "error",
        message: "missing 'date' parameter",
      }),
    };
  }

  switch (method) {
  case 'GET': {
    const privateKey = getPrivateKey(date);
    if (privateKey.key) {
      return {
        statusCode: 200,
        headers: responseHeaders(),
        body: JSON.stringify({
          status: "success",
          key: privateKey.key,
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers: responseHeaders(),
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
      headers: responseHeaders(),
      body: JSON.stringify({
        status: "error",
        message: "Unsupported method",
      }),
    };
  }
};
