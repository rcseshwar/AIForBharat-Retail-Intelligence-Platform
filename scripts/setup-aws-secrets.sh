#!/bin/bash

# AWS Secrets Setup Script
set -e

AWS_REGION=${AWS_REGION:-us-east-1}

echo "🔐 Setting up AWS Parameter Store secrets..."

# Function to create parameter
create_parameter() {
  local name=$1
  local value=$2
  local description=$3
  
  echo "Creating parameter: $name"
  aws ssm put-parameter \
    --name "$name" \
    --value "$value" \
    --type "SecureString" \
    --description "$description" \
    --region $AWS_REGION \
    --overwrite 2>/dev/null || echo "Parameter $name already exists"
}

# Prompt for values
echo "Please provide the following configuration values:"

read -p "Database URL (postgresql://user:pass@host:5432/db): " DATABASE_URL
read -p "Redis URL (redis://host:6379): " REDIS_URL
read -s -p "NextAuth Secret (generate a secure random string): " NEXTAUTH_SECRET
echo ""
read -p "NextAuth URL (https://your-domain.com): " NEXTAUTH_URL

# Create parameters
create_parameter "/retail-intelligence/database-url" "$DATABASE_URL" "PostgreSQL database connection string"
create_parameter "/retail-intelligence/redis-url" "$REDIS_URL" "Redis connection string"  
create_parameter "/retail-intelligence/nextauth-secret" "$NEXTAUTH_SECRET" "NextAuth.js secret key"
create_parameter "/retail-intelligence/nextauth-url" "$NEXTAUTH_URL" "Application URL for NextAuth"

echo "✅ All parameters created successfully!"
echo ""
echo "📋 Created parameters:"
aws ssm describe-parameters \
  --parameter-filters "Key=Name,Option=BeginsWith,Values=/retail-intelligence/" \
  --region $AWS_REGION \
  --query 'Parameters[].Name' \
  --output table

echo ""
echo "🔒 Security note: Parameters are encrypted with AWS KMS"
echo "🎯 Next: Run ./scripts/deploy-aws.sh to deploy the application"