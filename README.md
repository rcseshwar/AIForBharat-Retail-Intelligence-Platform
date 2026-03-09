# AI-Powered Retail Intelligence Platform

A comprehensive Next.js-based platform that provides retail teams, marketplace operators, and small business owners with AI-driven insights for decision-making. The platform uses OpenAI's API to translate natural language queries into database operations, analyze business data, and generate actionable recommendations.

## 🚀 Features

### Core AI Capabilities
- **Natural Language Database Querying**: Ask questions about your data in plain English
- **AI Copilot**: Conversational AI assistant for business decisions
- **Market Intelligence**: Real-time market trends and competitor analysis
- **Demand Forecasting**: Predict future product demand with confidence intervals
- **Pricing Optimization**: AI-powered pricing recommendations
- **Risk Analysis**: Identify business risks and compliance issues
- **Document Processing**: Extract insights from business documents

### Technical Features
- **Secure API Key Management**: Client-side storage with session-only access
- **Real-time Analytics**: Live dashboards with performance metrics
- **Comprehensive Data Analysis**: Pre-loaded demo data for immediate testing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Docker Containerization**: Easy deployment and scaling

## 🏗️ Architecture

### Technology Stack
- **Frontend/Backend**: Next.js 14+ with App Router
- **Database**: PostgreSQL 15+ with Prisma ORM
- **AI Provider**: OpenAI API (GPT-4 or GPT-4-turbo)
- **Caching**: Redis for performance optimization
- **Styling**: Tailwind CSS with Radix UI components
- **Containerization**: Docker and Docker Compose

### Security Features
- API keys stored only in browser session storage
- SQL injection prevention with parameterized queries
- Comprehensive query validation and sanitization
- HTTPS/TLS encryption for all communications

## 📋 Prerequisites

- Node.js 20+ and npm 10+
- Docker and Docker Compose
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-retail-intelligence-platform
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

Required environment variables:
```env
# Database
DATABASE_URL="postgresql://retail_user:retail_pass@localhost:5432/retail_intelligence"

# Redis
REDIS_URL="redis://localhost:6379"

# Application
NODE_ENV="development"
OPENAI_MODEL="gpt-4-turbo"
MAX_QUERY_RESULTS="1000"
ALERT_THRESHOLD="0.2"
LOG_LEVEL="info"
```

**Note**: OpenAI API key is now entered directly in the application interface for better security and flexibility.

### 3. Docker Deployment (Recommended)
```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f web
```

### 4. Manual Setup (Alternative)
```bash
# Install dependencies
npm install

# Start PostgreSQL and Redis (using Docker)
docker-compose up -d db cache

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed

# Start development server
npm run dev
```

### 5. Access the Application
- **Application**: http://localhost:3000
- **Database Admin** (optional): http://localhost:8080 (pgAdmin)
- **Redis Admin** (optional): http://localhost:8081 (Redis Commander)

### 6. Login with Demo Accounts
- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / user123

## 🔧 Configuration

### OpenAI API Key Setup
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. In the application, go to Dashboard
3. Enter your API key in the "OpenAI API Key" section
4. The key is stored securely in session memory only

### Database Schema
The platform includes comprehensive data models for:
- Users and Organizations
- Products and Sales
- Customers and Market Data
- Risk Analysis and Compliance
- Document Processing
- System Configuration and Audit Logs

### System Prompts
Admins can configure AI behavior through system prompts:
1. Go to Dashboard → Admin → System Prompts
2. Create or modify prompts to customize AI responses
3. Activate the desired prompt for all AI interactions

## 🐳 Docker Deployment

### Production Deployment
```bash
# Build and start production containers
docker-compose -f docker-compose.yml up -d

# Scale the web service
docker-compose up -d --scale web=3

# Update the application
docker-compose pull
docker-compose up -d
```

### Environment-specific Configurations
```bash
# Development with tools
docker-compose --profile tools up -d

# Production without development tools
docker-compose up -d web db cache
```

## ☁️ AWS Cloud Deployment

### Option 1: AWS ECS with Fargate

#### Prerequisites
- AWS CLI configured
- Docker images pushed to ECR
- VPC with public/private subnets
- RDS PostgreSQL instance
- ElastiCache Redis cluster

#### Deployment Steps

1. **Create ECR Repository**
```bash
# Create repository
aws ecr create-repository --repository-name ai-retail-platform

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and push image
docker build -t ai-retail-platform .
docker tag ai-retail-platform:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-retail-platform:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-retail-platform:latest
```

2. **Create RDS PostgreSQL Instance**
```bash
aws rds create-db-instance \
  --db-instance-identifier retail-intelligence-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --master-username retailuser \
  --master-user-password YourSecurePassword123 \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name your-db-subnet-group \
  --backup-retention-period 7 \
  --storage-encrypted
```

3. **Create ElastiCache Redis Cluster**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id retail-intelligence-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1 \
  --security-group-ids sg-xxxxxxxxx \
  --subnet-group-name your-cache-subnet-group
```

4. **Create ECS Task Definition**
```json
{
  "family": "ai-retail-platform",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-retail-platform:latest",
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
        },
        {
          "name": "DATABASE_URL",
          "value": "postgresql://retailuser:YourSecurePassword123@retail-intelligence-db.xxxxxxxxx.us-east-1.rds.amazonaws.com:5432/retail_intelligence"
        },
        {
          "name": "REDIS_URL",
          "value": "redis://retail-intelligence-redis.xxxxxx.cache.amazonaws.com:6379"
        },
        {
          "name": "NEXTAUTH_SECRET",
          "value": "your-production-secret-key"
        },
        {
          "name": "NEXTAUTH_URL",
          "value": "https://your-domain.com"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ai-retail-platform",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

5. **Create ECS Service with Load Balancer**
```bash
# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name ai-retail-platform-alb \
  --subnets subnet-xxxxxxxxx subnet-yyyyyyyyy \
  --security-groups sg-xxxxxxxxx

# Create target group
aws elbv2 create-target-group \
  --name ai-retail-platform-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxxxxxxxx \
  --target-type ip \
  --health-check-path /api/health

# Create ECS service
aws ecs create-service \
  --cluster your-cluster \
  --service-name ai-retail-platform \
  --task-definition ai-retail-platform:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx,subnet-yyyyyyyyy],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:account:targetgroup/ai-retail-platform-tg/xxxxxxxxx,containerName=web,containerPort=3000
```

### Option 2: AWS App Runner

1. **Create apprunner.yaml**
```yaml
version: 1.0
runtime: nodejs18
build:
  commands:
    build:
      - npm ci
      - npm run build
      - npx prisma generate
run:
  runtime-version: 18
  command: npm start
  network:
    port: 3000
    env: PORT
  env:
    - name: NODE_ENV
      value: production
    - name: DATABASE_URL
      value: postgresql://retailuser:password@your-rds-endpoint:5432/retail_intelligence
    - name: REDIS_URL
      value: redis://your-elasticache-endpoint:6379
    - name: NEXTAUTH_SECRET
      value: your-secret-key
    - name: NEXTAUTH_URL
      value: https://your-app-runner-url
```

2. **Deploy with App Runner**
```bash
aws apprunner create-service \
  --service-name ai-retail-platform \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-retail-platform:latest",
      "ImageConfiguration": {
        "Port": "3000"
      },
      "ImageRepositoryType": "ECR"
    },
    "AutoDeploymentsEnabled": true
  }' \
  --instance-configuration '{
    "Cpu": "0.25 vCPU",
    "Memory": "0.5 GB"
  }'
```

### Option 3: AWS Lambda with Serverless Framework

1. **Install Serverless Framework**
```bash
npm install -g serverless
npm install --save-dev serverless-nextjs-plugin
```

2. **Create serverless.yml**
```yaml
service: ai-retail-platform

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    DATABASE_URL: ${env:DATABASE_URL}
    REDIS_URL: ${env:REDIS_URL}
    NEXTAUTH_SECRET: ${env:NEXTAUTH_SECRET}
    NEXTAUTH_URL: ${env:NEXTAUTH_URL}

plugins:
  - serverless-nextjs-plugin

custom:
  nextjs:
    memory: 1024
    timeout: 30
```

3. **Deploy**
```bash
serverless deploy
```

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Property-Based Testing
The platform includes property-based tests for critical functionality:
```bash
# Run property tests
npm test -- --testNamePattern="Property"
```

## 📊 Monitoring and Observability

### Health Checks
- **Application**: `/api/health`
- **Database**: Automatic connection testing
- **Redis**: Ping/pong verification

### Logging
- Structured JSON logging
- Request correlation IDs
- Performance metrics
- Security audit trails

### Metrics
- Request latency and throughput
- Error rates by category
- AI API usage and costs
- Database query performance
- Cache hit rates

## 🔒 Security

### Best Practices Implemented
- API keys stored only in encrypted session memory
- SQL injection prevention
- Row-level security for data isolation
- HTTPS/TLS encryption
- Comprehensive audit logging
- Rate limiting on sensitive endpoints

### Security Checklist
- [ ] Change default passwords
- [ ] Configure HTTPS certificates
- [ ] Set up proper firewall rules
- [ ] Enable database encryption at rest
- [ ] Configure backup retention policies
- [ ] Set up monitoring and alerting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**API Key Not Working**
- Ensure your OpenAI API key starts with "sk-"
- Check that you have sufficient credits in your OpenAI account
- Verify the key is entered correctly without extra spaces

**Database Connection Issues**
- Check that PostgreSQL is running
- Verify DATABASE_URL is correct
- Ensure database exists and user has proper permissions

**Redis Connection Issues**
- Check that Redis is running
- Verify REDIS_URL is correct
- Ensure Redis is accessible from the application

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the [Documentation](https://docs.your-domain.com)
- Contact support at support@your-domain.com

## 🗺️ Roadmap

### Upcoming Features
- [ ] Multi-model AI support (Anthropic, Google)
- [ ] Advanced analytics with ML models
- [ ] Mobile applications
- [ ] API access for third-party integrations
- [ ] Custom dashboard builder
- [ ] Automated report generation
- [ ] Webhook integrations
- [ ] A/B testing framework

### Performance Improvements
- [ ] Query result caching
- [ ] Database query optimization
- [ ] Background job processing
- [ ] Real-time WebSocket updates
- [ ] GraphQL API
- [ ] Microservices architecture