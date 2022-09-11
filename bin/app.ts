#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({silent: true})
import "source-map-support/register"
import cdk = require("aws-cdk-lib")
import { LambdaApiStack } from "../lib/lambda-api-stack"

export const stackName = "TimedEnvelopeApiStack"

const app = new cdk.App()
new LambdaApiStack(app, stackName, {})
