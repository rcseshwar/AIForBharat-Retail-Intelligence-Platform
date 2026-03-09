# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rcseshwar/AIForBharat-Retail-Intelligence-Platform)

## Manual Deployment Steps

### 1. Prerequisites
- GitHub repository with your code
- Vercel account (free tier available)
- PostgreSQL database (optional - can use Vercel Postgres)
- Redis instance (optional - can use Upstash Redis)

### 2. Environment Variables
Set these environment variables in your Vercel project settings:

**Required for full functionality:**
```
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
```

**Optional (with defaults):**
```
NODE_ENV=production
OPENAI_MODEL=gpt-4-turbo
MAX_QUERY_RESULTS=1000
ALERT_THRESHOLD=0.2
LOG_LEVEL=info
```

**Note:** OpenAI API key is entered directly in the application interface, not as an environment variable.

### 3. Database Setup Options

#### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Storage tab
3. Create a new Postgres database
4. Copy the connection string to `DATABASE_URL`

#### Option B: External PostgreSQL
- Use any PostgreSQL provider (AWS RDS, Google Cloud SQL, etc.)
- Ensure the database is accessible from Vercel's servers
- Set `DATABASE_URL` with the connection string

### 4. Redis Setup Options

#### Option A: Upstash Redis (Recommended for Vercel)
1. Create account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the connection string to `REDIS_URL`

#### Option B: External Redis
- Use any Redis provider (AWS ElastiCache, Google Cloud Memorystore, etc.)
- Set `REDIS_URL` with the connection string

### 5. Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)
1. Connect your GitHub repository to Vercel
2. Import your project
3. Set environment variables
4. Deploy automatically on every push

#### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 6. Post-Deployment Setup

1. **Database Migration**: Run Prisma migrations if using a new database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

2. **Health Check**: Visit `/api/health` to verify services are connected

3. **Test Application**: 
   - Go to your deployed URL
   - Enter an OpenAI API key
   - Test the query and copilot features

### 7. Troubleshooting

#### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

#### Runtime Errors
- Check function logs in Vercel dashboard
- Verify environment variables are set correctly
- Test database and Redis connections

#### Performance Issues
- Monitor function execution time
- Consider upgrading to Vercel Pro for longer timeouts
- Optimize database queries

### 8. Production Considerations

#### Security
- Use strong database passwords
- Enable SSL for database connections
- Regularly rotate API keys

#### Monitoring
- Set up Vercel Analytics
- Monitor function execution times
- Set up error tracking (Sentry, etc.)

#### Scaling
- Consider database connection pooling
- Monitor Redis memory usage
- Use Vercel's edge functions for better performance

## Support

If you encounter issues during deployment:
1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Test the health endpoint: `/api/health`
4. Check database and Redis connectivity

## Features Available Without External Services

The application will work with limited functionality even without PostgreSQL and Redis:
- OpenAI API key input and validation
- Basic UI navigation
- AI chat functionality (Copilot)
- Health check endpoint

For full functionality including data persistence and caching, set up the database and Redis services.