import { Construct } from 'constructs';
import { CfnWorkGroup } from 'aws-cdk-lib/aws-athena';

export interface AthenaWorkgroupProps {
  workGroupName: string;
  resultBucket: string;
}

export class AthenaWorkgroup extends Construct {
  public readonly workgroup: CfnWorkGroup;
  constructor(scope: Construct, id: string, props: AthenaWorkgroupProps) {
    super(scope, id);
    this.workgroup = new CfnWorkGroup(this, 'WorkGroup', {
      name: props.workGroupName,
      description: 'Workgroup for Athena demo',
      state: 'ENABLED',
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${props.resultBucket}/athena-results/`
        },
      },
    });
  }
}