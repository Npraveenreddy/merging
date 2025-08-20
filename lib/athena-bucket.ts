import { Construct } from 'constructs';
import { Bucket, BucketEncryption, BlockPublicAccess, RemovalPolicy } from 'aws-cdk-lib/aws-s3';

export interface AthenaBucketProps {
  bucketName: string;
}

export class AthenaBucket extends Construct {
  public readonly bucket: Bucket;
  constructor(scope: Construct, id: string, props: AthenaBucketProps) {
    super(scope, id);
    this.bucket = new Bucket(this, 'Bucket', {
      bucketName: props.bucketName,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}