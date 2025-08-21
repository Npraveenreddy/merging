import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AthenaBucket } from "./s3-bucket";
import { GlueDatabase } from "./glue-database";
import { AthenaWorkgroup } from "./athena-workgroup";
import { EnvConfig } from "./config";

interface MainStackProps extends cdk.StackProps {
  config: EnvConfig;
}

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props);

    const { config } = props;

    // Pass only what's needed
    new AthenaBucket(this, "AthenaBucket", {
      bucketName: config.bucketName,
    });

    new GlueDatabase(this, "GlueDatabase", {
      dbName: config.dbName,
      tableName: config.tableName,
    });

    new AthenaWorkgroup(this, "AthenaWorkgroup", {
      workgroupName: config.workgroupName,
      resultsBucketName: config.bucketName,
    });
  }
}
