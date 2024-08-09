import AWS from "aws-sdk";
import "dotenv/config";
// console.log(process.env);

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const client = new AWS.DynamoDB.DocumentClient();
export { client };
