# Deployment Guide

## Quick Start with Docker

### 1. Clone and Setup
```bash
git clone <repository-url>
cd ai-retail-intelligence-platform
cp .env.example .env
# Edit .env with your settings
```

### 2. Deploy with Docker Compose
```bash
docker-compose up -d
```

### 3. Access Application
- App: http://localhost:3000
- Login: admin@demo.com / admin123

## AWS Production Deployment

### Prerequisites
- AWS CLI configured
- Domain name (optional)
- SSL certificate (for HTTPS)

### Option 1: ECS Fargate (Recommended)

#### Step 1: Create Infrastructure
```bash
# Create VPC, subnets, security groups
aws cloudformation create-stack \
  --stack-name retail-intelligence-infra \
  --template-body file://aws/infrastructure.yaml \
  --capabilities CAPABILITY_IAM
```

#### Step 2: Create Database
```bash
aws rds create-db-instance \
  --db-instance-identifier retail-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username retailuser \
  --master-user-password SecurePass123 \
  --allocated-storage 20
```

#### Step 3: Deploy Application
```bash
# Build and push to ECR
./scripts/deploy-aws.sh
```

### Option 2: App Runner (Simpler)
```bash
# Deploy to App Runner
aws apprunner create-service \
  --service-name ai-retail-platform \
  --source-configuration file://aws/apprunner-config.json
```

## Environment Variables

### Required
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

### Optional
```env
OPENAI_MODEL=gpt-4-turbo
SESSION_TTL=3600
MAX_QUERY_RESULTS=1000
LOG_LEVEL=info
```

## Security Checklist

- [ ] Change default passwords
- [ ] Configure HTTPS
- [ ] Set up firewall rules
- [ ] Enable database encryption
- [ ] Configure backups
- [ ] Set up monitoring

## Monitoring

### Health Checks
- Application: `/api/health`
- Database: Connection testing
- Redis: Ping verification

### Logs
```bash
# View application logs
docker-compose logs -f web

# AWS CloudWatch (ECS)
aws logs tail /ecs/ai-retail-platform --follow
```

## Scaling

### Horizontal Scaling
```bash
# Docker Compose
docker-compose up -d --scale web=3

# ECS
aws ecs update-service \
  --cluster retail-cluster \
  --service ai-retail-platform \
  --desired-count 3
```

## Backup and Recovery

### Database Backup
```bash
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Automated (AWS RDS)
aws rds create-db-snapshot \
  --db-instance-identifier retail-db \
  --db-snapshot-identifier retail-backup-$(date +%Y%m%d)
```

## Troubleshooting

### Common Issues
1. **Database connection failed**: Check DATABASE_URL
2. **Redis connection failed**: Check REDIS_URL  
3. **API key invalid**: Verify OpenAI API key format
4. **Build failed**: Check Node.js version (20+)

### Debug Commands
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs web

# Connect to database
docker-compose exec db psql -U retail_user retail_intelligence

# Connect to Redis
docker-compose exec cache redis-cli
```