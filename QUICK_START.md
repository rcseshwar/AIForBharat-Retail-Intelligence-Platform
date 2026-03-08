# 🚀 Quick Start Guide - AI-Powered Retail Intelligence Platform

## ✅ Fixed Docker Build Issues

The Docker build errors have been resolved! Here's what was fixed:

### Issues Resolved:
1. **Missing dependencies**: Added `@radix-ui/react-avatar`, `next-themes`, and `tailwindcss-animate`
2. **Package structure**: Moved build dependencies to `devDependencies` 
3. **Docker configuration**: Fixed Dockerfile to use all dependencies during build
4. **Next.js configuration**: Added `output: 'standalone'` for Docker optimization
5. **Environment variables**: Fixed ENV format in Dockerfile
6. **Health check**: Updated to use Node.js instead of curl

## 🏃‍♂️ How to Run the Application

### Option 1: Docker Compose (Recommended)

```bash
# 1. Start all services (PostgreSQL, Redis, and the web app)
docker-compose up -d

# 2. Check service status
docker-compose ps

# 3. View application logs
docker-compose logs -f web
```

**Access the application:**
- **Main App**: http://localhost:3000
- **Database Admin** (optional): http://localhost:8080 (pgAdmin)
- **Redis Admin** (optional): http://localhost:8081 (Redis Commander)

### Option 2: Manual Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start database and Redis with Docker
docker-compose up -d db cache

# 3. Set up environment
cp .env.example .env
# Edit .env with your settings

# 4. Set up the database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Add sample data

# 5. Start the development server
npm run dev
```

## 🔑 Demo Login Credentials

- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / user123

## 🔧 OpenAI API Key Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open the app at http://localhost:3000
3. Login with demo credentials
4. Go to Dashboard and enter your API key
5. The key is stored securely in session memory only

## 🎯 What You'll See

The platform provides:

- **Dashboard**: Overview of business metrics and AI capabilities
- **Natural Language Queries**: Ask questions about your data in plain English
- **Market Intelligence**: Real-time market trends and analysis
- **AI Copilot**: Conversational AI assistant for business decisions
- **Document Processing**: Upload and analyze business documents
- **Admin Panel**: Configure system prompts and manage users

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:seed         # Seed with sample data
npm run db:studio       # Open Prisma Studio

# Docker
docker-compose up -d    # Start all services
docker-compose down     # Stop all services
docker-compose ps       # Check service status
docker-compose logs -f web  # View application logs

# Testing
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

## 🔍 Troubleshooting

### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Stop conflicting containers
docker stop $(docker ps -q --filter "publish=3000")
docker stop $(docker ps -q --filter "publish=5432")
docker stop $(docker ps -q --filter "publish=6379")
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

### Application Health Check
```bash
# Check if application is running
curl http://localhost:3000/api/health

# Expected response when healthy:
# {"status":"healthy","timestamp":"...","services":{"database":"connected","redis":"connected"}}
```

## 🎉 Success!

The application is now running successfully with:
- ✅ Docker build working
- ✅ All services starting correctly
- ✅ Frontend loading properly
- ✅ Database and Redis connections
- ✅ Authentication system ready
- ✅ AI features available (with OpenAI API key)

You can now access the full AI-Powered Retail Intelligence Platform at http://localhost:3000!