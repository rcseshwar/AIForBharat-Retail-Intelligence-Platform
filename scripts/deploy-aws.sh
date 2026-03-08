#!/bin/bash

# AWS Deployment Script for AI Retail Intelligence Platform
set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPOSITORY="ai-retail-platform"
ECS_CLUSTER="retail-intelligence"
ECS_SERVICE="ai-retail-platform"

echo "🚀 Starting AWS deployment..."
echo "Region: $AWS_REGION"
echo "Account: $AWS_ACCOUNT_ID"

# Step 1: Create ECR repository if it doesn't exist
echo "📦 Setting up ECR repository..."
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION 2>/dev/null || \
aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION

# Step 2: Build and push Docker image
echo "🔨 Building Docker image..."
docker build -t $ECR_REPOSITORY .

# Get ECR login token
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag and push image
IMAGE_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest"
echo "📤 Pushing image to ECR..."
docker tag $ECR_REPOSITORY:latest $IMAGE_URI
docker push $IMAGE_URI

# Step 3: Update ECS task definition
echo "📋 Updating ECS task definition..."
TASK_DEFINITION=$(cat <<EOF
{
  "family": "$ECS_SERVICE",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::$AWS_ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "$IMAGE_URI",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:ssm:$AWS_REGION:$AWS_ACCOUNT_ID:parameter/retail-intelligence/database-url"
        },
        {
          "name": "REDIS_URL", 
          "valueFrom": "arn:aws:ssm:$AWS_REGION:$AWS_ACCOUNT_ID:parameter/retail-intelligence/redis-url"
        },
        {
          "name": "NEXTAUTH_SECRET",
          "valueFrom": "arn:aws:ssm:$AWS_REGION:$AWS_ACCOUNT_ID:parameter/retail-intelligence/nextauth-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/$ECS_SERVICE",
          "awslogs-region": "$AWS_REGION",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
EOF
)

# Register new task definition
NEW_TASK_DEF=$(echo $TASK_DEFINITION | aws ecs register-task-definition --cli-input-json file:///dev/stdin --query 'taskDefinition.taskDefinitionArn' --output text)
echo "✅ Registered new task definition: $NEW_TASK_DEF"

# Step 4: Update ECS service
echo "🔄 Updating ECS service..."
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --task-definition $NEW_TASK_DEF \
  --force-new-deployment

# Step 5: Wait for deployment to complete
echo "⏳ Waiting for deployment to complete..."
aws ecs wait services-stable \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE

echo "🎉 Deployment completed successfully!"
echo "📊 Service status:"
aws ecs describe-services \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount,Pending:pendingCount}'

echo ""
echo "🔗 Next steps:"
echo "1. Check application logs: aws logs tail /ecs/$ECS_SERVICE --follow"
echo "2. Verify health: curl https://your-domain.com/api/health"
echo "3. Monitor in AWS Console: https://console.aws.amazon.com/ecs/"