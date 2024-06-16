import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const env = require('../env.json');

const cloudfront = new CloudFrontClient(env.s3Config);

const invalidation = {
  DistributionId: env.s3DistributionIdTestnet,
  InvalidationBatch: {
    CallerReference: `my-invalidation-${Date.now()}`,
    Paths: {
      Quantity: 1,
      Items: [
        "/*"
      ]
    }
  }
};

const command = new CreateInvalidationCommand(invalidation);
cloudfront.send(command)
  .then(response => {
    console.log("Invalidation created:", response);
  })
  .catch(error => {
    console.error("Error creating invalidation:", error);
  });
