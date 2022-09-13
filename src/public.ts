import { APIGatewayProxyEvent } from "aws-lambda";
import { responseHeaders } from "./headers";
import { getPublicKey } from "./lib";

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
    return {
      statusCode: 200,
      headers: responseHeaders(),
      body: JSON.stringify({
        status: "success",
        key: getPublicKey(date),
      }),
    };
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
