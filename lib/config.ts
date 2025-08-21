export interface EnvConfig {
  bucketName: string;
  dbName: string;
  tableName: string;
  workgroupName: string;
}

const configs: Record<string, EnvConfig> = {
  dev: {
    bucketName: "my-athena-results-dev",
    dbName: "dev_athena_db",
    tableName: "dev_table",
    workgroupName: "dev-athena-wg",
  },
  prod: {
    bucketName: "my-athena-results-prod",
    dbName: "prod_athena_db",
    tableName: "prod_table",
    workgroupName: "prod-athena-wg",
  },
};

export function getConfig(env: string): EnvConfig {
  return configs[env] ?? configs.dev;
}
