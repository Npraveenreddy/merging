import * as glue from "aws-cdk-lib/aws-glue";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface GlueDatabaseProps {
  dbName: string;
  tableName: string;
}

export class GlueDatabase extends Construct {
  constructor(scope: Construct, id: string, props: GlueDatabaseProps) {
    super(scope, id);

    new glue.CfnDatabase(this, "GlueDatabase", {
      catalogId: cdk.Aws.ACCOUNT_ID,
      databaseInput: {
        name: props.dbName,
      },
    });

    new glue.CfnTable(this, "GlueTable", {
      catalogId: cdk.Aws.ACCOUNT_ID,
      databaseName: props.dbName,
      tableInput: {
        name: props.tableName,
        storageDescriptor: {
          columns: [
            { name: "id", type: "int" },
            { name: "name", type: "string" },
          ],
          inputFormat: "org.apache.hadoop.mapred.TextInputFormat",
          outputFormat: "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
          serdeInfo: {
            serializationLibrary: "org.openx.data.jsonserde.JsonSerDe",
          },
        },
      },
    });
  }
}
