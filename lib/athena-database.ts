import { Construct } from 'constructs';
import { CfnDatabase } from 'aws-cdk-lib/aws-athena';

export interface AthenaDatabaseProps {
  dbName: string;
}

export class AthenaDatabase extends Construct {
  public readonly database: CfnDatabase;
  constructor(scope: Construct, id: string, props: AthenaDatabaseProps) {
    super(scope, id);
    this.database = new CfnDatabase(this, 'Database', {
      databaseInput: {
        name: props.dbName,
        description: 'Demo Athena database',
      },
      catalogName: 'AwsDataCatalog',
    });
  }
}