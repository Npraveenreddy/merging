import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AthenaBucket } from './athena-bucket';
import { AthenaWorkgroup } from './athena-workgroup';
import { AthenaDatabase } from './athena-database';
import { AthenaTable } from './athena-table';
import { resourceNames } from './resource-names';

export class MergingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3 bucket for Athena results
    const athenaBucket = new AthenaBucket(this, 'AthenaBucket', {
      bucketName: resourceNames.bucketName,
    });

    // Athena workgroup
    const athenaWorkgroup = new AthenaWorkgroup(this, 'AthenaWorkgroup', {
      workGroupName: resourceNames.workGroupName,
      resultBucket: athenaBucket.bucket.bucketName,
    });

    // Athena database
    const athenaDatabase = new AthenaDatabase(this, 'AthenaDatabase', {
      dbName: resourceNames.dbName,
    });

    // Athena table
    const athenaTable = new AthenaTable(this, 'AthenaTable', {
      dbName: resourceNames.dbName,
      tableName: resourceNames.tableName,
      bucketName: resourceNames.bucketName,
    });
  }
}