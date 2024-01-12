#!/bin/bash

# Replace these values with your own
SERVICE_NAME="wl-email-service"

# Remove API Key and Usage Plan
API_KEY_ID=$(aws apigateway get-api-keys --name-query "$SERVICE_NAME" --query 'items[0].id' --output text)

if [ -n "$API_KEY_ID" ]; then
  aws apigateway delete-api-key --api-key "$API_KEY_ID"
fi

USAGE_PLAN_ID=$(aws apigateway get-usage-plans --name-query "$SERVICE_NAME" --query 'items[0].id' --output text)

if [ -n "$USAGE_PLAN_ID" ]; then
  aws apigateway delete-usage-plan --usage-plan-id "$USAGE_PLAN_ID"
fi

# Remove API Gateway
API_ID=$(aws apigateway get-rest-apis --query 'items[0].id' --output text)

if [ -n "$API_ID" ]; then
  aws apigateway delete-rest-api --rest-api-id "$API_ID"
fi

# Remove Lambda function
FUNCTION_NAME=$(aws lambda list-functions --query "Functions[?starts_with(FunctionName, '$SERVICE_NAME')].FunctionName" --output text)

if [ -n "$FUNCTION_NAME" ]; then
  aws lambda delete-function --function-name "$FUNCTION_NAME"
fi

# Remove CloudFormation stack
STACK_NAME=$(aws cloudformation list-stacks --query "StackSummaries[?starts_with(StackName, '$SERVICE_NAME') && StackStatus != 'DELETE_COMPLETE'].StackName" --output text)

if [ -n "$STACK_NAME" ]; then
  # Empty and delete S3 bucket (assuming it's used by the Serverless deployment)
  S3_BUCKET=$(aws cloudformation describe-stack-resources --stack-name "$STACK_NAME" --query "StackResources[?ResourceType=='AWS::S3::Bucket'].PhysicalResourceId" --output text)

  if [ -n "$S3_BUCKET" ]; then
    aws s3 rm s3://"$S3_BUCKET" --recursive
    aws s3 rb s3://"$S3_BUCKET" --force
  fi

  # Wait for S3 bucket to be deleted before deleting the stack
  aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME"
  aws cloudformation delete-stack --stack-name "$STACK_NAME"
fi

echo "Teardown completed. All resources deleted."
