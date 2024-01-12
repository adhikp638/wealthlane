#!/bin/bash

# Create API Key
echo "Creating API Key..."
API_KEY_ID=$(aws apigateway create-api-key --name "auto-generated-api-key" --enabled --output json | jq -r '.id')

if [ $? -ne 0 ]; then
  echo "Failed to create API Key. Exiting."
  exit 1
fi

echo "API Key created successfully. ID: $API_KEY_ID"

# Create Usage Plan (without specifying a stage)
echo "Creating Usage Plan..."
USAGE_PLAN_ID=$(aws apigateway create-usage-plan --name "auto-generated-usage-plan" --output json | jq -r '.id')

if [ $? -ne 0 ]; then
  echo "Failed to create Usage Plan. Exiting."
  exit 1
fi

echo "Usage Plan created successfully. ID: $USAGE_PLAN_ID"

# Associate API Key with Usage Plan
echo "Associating API Key with Usage Plan..."
aws apigateway create-usage-plan-key --usage-plan-id "$USAGE_PLAN_ID" --key-id "$API_KEY_ID" --key-type "API_KEY"

if [ $? -ne 0 ]; then
  echo "Failed to associate API Key with Usage Plan. Exiting."
  exit 1
fi

echo "API Key associated with Usage Plan successfully."

# Deploy API
echo "Deploying API..."
serverless deploy

if [ $? -ne 0 ]; then
  echo "Failed to deploy API. Exiting."
  exit 1
fi

echo "API deployed successfully."

# Enable CORS for the specified method
echo "Enabling CORS..."
REST_API_ID=$(aws apigateway get-rest-apis --query 'items[0].id' --output text)

if [ -z "$REST_API_ID" ]; then
  echo "Failed to retrieve REST API ID. Exiting."
  exit 1
fi

RESOURCE_ID=$(aws apigateway get-resources --rest-api-id "$REST_API_ID" --query 'items[1].id' --output text)  # Adjust the index to match the correct resource
echo "Found Resource ID as $RESOURCE_ID for REST_API_ID $REST_API_ID"

# Update Integration Response to enable CORS
aws apigateway update-integration-response \
  --rest-api-id "$REST_API_ID" \
  --resource-id "$RESOURCE_ID" \
  --http-method POST \
  --status-code 200 \
  --patch-operations "op=replace,path=/responseParameters/method.response.header.Access-Control-Allow-Origin,value='*'" \
  --patch-operations "op=replace,path=/responseParameters/method.response.header.Access-Control-Allow-Headers,value='Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"

# Deploy the API again to apply the CORS configuration
echo "Deploying API again to apply CORS configuration..."
serverless deploy

if [ $? -ne 0 ]; then
  echo "Failed to redeploy API. Exiting."
  exit 1
fi

echo "API redeployed successfully with CORS configuration."

# Get the API Key value
echo "Getting API Key value..."
API_KEY=$(aws apigateway get-api-key --api-key "$API_KEY_ID" --include-value --output json | jq -r '.value')

if [ $? -ne 0 ]; then
  echo "Failed to get API Key value. Exiting."
  exit 1
fi

echo "API Key value retrieved successfully."

# Get the API URL
echo "Getting API URL..."
API_URL=$(serverless info --json | jq -r '.service + " - " + .stage + " - " + .region')

echo "Auto-generated API Key Name: auto-generated-api-key"
echo "Auto-generated Usage Plan Name: auto-generated-usage-plan"
echo "Auto-generated API Key Value: $API_KEY"
echo "API URL: $API_URL"

echo "API deployed successfully with CORS enabled and API key protection."
