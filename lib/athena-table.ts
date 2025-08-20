import { Construct } from 'constructs';
import { CfnTable } from 'aws-cdk-lib/aws-athena';

export interface AthenaTableProps {
  dbName: string;
  tableName: string;
  bucketName: string;
}

export class AthenaTable extends Construct {
  public readonly table: CfnTable;
  constructor(scope: Construct, id: string, props: AthenaTableProps) {
    super(scope, id);
    this.table = new CfnTable(this, 'Table', {
      databaseName: props.dbName,
      catalogName: 'AwsDataCatalog',
      tableInput: {
        name: props.tableName,
        tableType: 'EXTERNAL_TABLE',
        parameters: { 'classification': 'csv' },
        storageDescriptor: {
          columns: [
            { name: 'col1', type: 'string' },
            { name: 'col2', type: 'int' },
          ],
          location: `s3://${props.bucketName}/data/`,
          inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe',
            parameters: { 'field.delim': ',' },
          },
        },
      },
    });
  }
}