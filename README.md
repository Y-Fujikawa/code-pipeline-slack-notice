# code-pipeline-slack-notice

```bash
.
├── README.MD                   <-- This instructions file
├── event.json                  <-- API Gateway Proxy Integration event payload
├── lib                         <-- Source code for a lambda function
│   └── app.js                  <-- Lambda function code
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## 前提条件

* AWS CLI already configured with Administrator permission
* [NodeJS 10.10+ installed](https://nodejs.org/en/download/releases/)

## SAM and AWS CLI commands

All commands used throughout this document

```bash
# Install library
cd lib
npm install

# Create S3 bucket
aws s3 mb s3://BUCKET_NAME

# Package Lambda function defined locally and upload to S3 as an artifact
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME

# Deploy SAM template as a CloudFormation stack
sam deploy \
    --template-file packaged.yaml \
    --stack-name code-pipeline-slack-notice \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides SlackUrl=https://hooks.slack.com/services/XXXXXXXX
```

**NOTE**: Alternatively this could be part of package.json scripts section.
