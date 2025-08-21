import * as athena from "aws-cdk-lib/aws-athena";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface AthenaWorkgroupProps {
  workgroupName: string;
  resultsBucketName: string;   // <-- add this
}

export class AthenaWorkgroup extends Construct {
  constructor(scope: Construct, id: string, props: AthenaWorkgroupProps) {
    super(scope, id);

    new athena.CfnWorkGroup(this, "AthenaWorkgroup", {
      name: props.workgroupName,
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${props.resultsBucketName}/results/`,
        },
      },
    });
  }
}
