import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1'
})

const ses = new AWS.SES({ apiVersion: '2020-12-01'});
const cloudwatch = new AWS.CloudWatch()

export {ses, cloudwatch};