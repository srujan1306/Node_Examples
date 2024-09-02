import AWS from "aws-sdk";
import "dotenv/config";
// console.log(process.env);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const client = new AWS.DynamoDB.DocumentClient();
export { client };
