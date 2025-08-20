#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { MergingStack } from '../lib/merging-stack';

const app = new App();
const env = app.node.tryGetContext('env') || 'dev';

new MergingStack(app, `MergingStack-${env}`, {
  env: { 
    region: process.env.CDK_DEFAULT_REGION, 
    account: process.env.CDK_DEFAULT_ACCOUNT,
  }
});