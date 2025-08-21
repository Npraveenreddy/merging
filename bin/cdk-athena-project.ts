#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../lib/main-stack";
import { getConfig } from "../lib/config";

const app = new cdk.App();

const envName = app.node.tryGetContext("env") || "dev";
const config = getConfig(envName);

// new MainStack(app, `${envName}-AthenaInfraStack`, {
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.CDK_DEFAULT_REGION,
//   },
//   config, // pass custom config
// });

new MainStack(app, `${envName}-AthenaInfraStack`, {
  env: {
    account: "7904493845",   // 🔹 your AWS Account ID
    region: "us-east-1",       // 🔹 or whichever region
  },
  config, // pass custom config
});
