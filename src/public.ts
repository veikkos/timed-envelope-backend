import { APIGatewayProxyEvent } from "aws-lambda";
import { getPublicKey } from "./lib";

exports.handler = async (event : APIGatewayProxyEvent) => {
  const method = event.requestContext.httpMethod;

  switch (method) {
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
      body: JSON.stringify({
        status: "error",
        message: "Unsupported method",
      }),
    };
  }
};
