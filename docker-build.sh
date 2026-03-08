#!/bin/bash

# Docker build script for AI Retail Intelligence Platform
set -e

echo "🏗️  Building AI Retail Intelligence Platform Docker image..."

# Clean up any existing build artifacts
echo "🧹 Cleaning up build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# Build the Docker image
echo "🐳 Building Docker image..."
docker build -t ai-retail-platform . --no-cache

echo "✅ Docker image built successfully!"
echo "🚀 To run the application:"
echo "   docker-compose up -d"
echo ""
echo "📊 To check the status:"
echo "   docker-compose ps"
echo ""
echo "📝 To view logs:"
echo "   docker-compose logs -f web"