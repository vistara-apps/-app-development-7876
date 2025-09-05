# RetailFlow AI - Deployment Guide

## Overview

This guide covers the complete deployment process for RetailFlow AI, from development to production environments.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Docker (optional)
- Cloud platform account (Vercel, Netlify, AWS, etc.)

## Environment Setup

### 1. Environment Variables

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Configure the following variables:

```bash
# Required for all environments
VITE_API_BASE_URL=your_api_endpoint
VITE_LLM_PROVIDER=mock # or openai, anthropic

# Production API keys (when not using mock)
VITE_OPENAI_API_KEY=your_key
VITE_ANTHROPIC_API_KEY=your_key
```

### 2. Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at http://localhost:5173
```

### 3. Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for React applications:

#### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Vercel Configuration:**

Create `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "env": {
    "VITE_API_BASE_URL": "@api_base_url",
    "VITE_LLM_PROVIDER": "@llm_provider"
  }
}
```

### Option 2: Netlify

#### Automatic Deployment

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**Netlify Configuration:**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Docker Deployment

#### Dockerfile (Already included)

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build and Run

```bash
# Build Docker image
docker build -t retailflow-ai .

# Run container
docker run -p 3000:80 retailflow-ai

# Or use docker-compose
docker-compose up -d
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=https://your-api.com
      - VITE_LLM_PROVIDER=openai
    restart: unless-stopped
```

### Option 4: AWS S3 + CloudFront

#### Build and Upload

```bash
# Build the project
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-retailflow-bucket

# Upload files
aws s3 sync dist/ s3://your-retailflow-bucket --delete

# Enable static website hosting
aws s3 website s3://your-retailflow-bucket --index-document index.html --error-document index.html
```

#### CloudFront Distribution

```bash
# Create CloudFront distribution (via AWS Console or CLI)
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Environment-Specific Configurations

### Development

```bash
VITE_API_BASE_URL=http://localhost:3001/api
VITE_LLM_PROVIDER=mock
VITE_DEBUG_MODE=true
```

### Staging

```bash
VITE_API_BASE_URL=https://staging-api.retailflow.com
VITE_LLM_PROVIDER=openai
VITE_DEBUG_MODE=false
```

### Production

```bash
VITE_API_BASE_URL=https://api.retailflow.com
VITE_LLM_PROVIDER=openai
VITE_DEBUG_MODE=false
VITE_SENTRY_DSN=your_sentry_dsn
```

## API Integration

### Mock Mode (Development)

The application runs in mock mode by default:

- No external API calls required
- Realistic demo data provided
- Perfect for development and testing

### Production APIs

#### OpenAI Integration

```bash
VITE_LLM_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-your-key-here
VITE_OPENAI_MODEL=gpt-4
```

#### Anthropic Integration

```bash
VITE_LLM_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=your-key-here
VITE_ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

#### Custom Backend

```bash
VITE_LLM_PROVIDER=custom
VITE_API_BASE_URL=https://your-backend.com/api
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Enable gzip compression
# Configure in your web server (nginx, apache, etc.)
```

### CDN Configuration

Configure your CDN to cache static assets:

```
Cache-Control: public, max-age=31536000 # 1 year for assets
Cache-Control: public, max-age=0, must-revalidate # For index.html
```

### Service Worker (Optional)

Add service worker for offline functionality:

```javascript
// In src/main.jsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

## Monitoring and Analytics

### Error Tracking with Sentry

```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Configure in src/main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE
})
```

### Analytics

```bash
# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Custom analytics
VITE_ANALYTICS_ENDPOINT=https://your-analytics.com
```

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use platform-specific environment variable management
- Rotate API keys regularly

### Content Security Policy

Add CSP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### HTTPS

- Always use HTTPS in production
- Configure SSL certificates
- Enable HSTS headers

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

#### Environment Variable Issues

```bash
# Verify environment variables are loaded
console.log(import.meta.env)

# Check variable naming (must start with VITE_)
VITE_API_KEY=value # ✅ Correct
API_KEY=value      # ❌ Won't work
```

#### API Connection Issues

```bash
# Test API connectivity
curl -X GET https://your-api.com/health

# Check CORS configuration
# Ensure your API allows requests from your domain
```

### Performance Issues

```bash
# Analyze bundle size
npm run build -- --analyze

# Check for large dependencies
npm ls --depth=0

# Enable compression
# Configure gzip/brotli in your web server
```

## Rollback Strategy

### Quick Rollback

```bash
# Vercel
vercel rollback

# Netlify
netlify rollback

# Docker
docker run previous-image-tag
```

### Database Migrations

If using a backend with database:

```bash
# Always backup before deployment
# Test migrations in staging first
# Have rollback scripts ready
```

## Health Checks

### Application Health

Create a health check endpoint:

```javascript
// In your API
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  })
})
```

### Monitoring

Set up monitoring for:

- Application uptime
- Response times
- Error rates
- API quota usage

## Support

For deployment support:

- 📧 Email: devops@retailflow-ai.com
- 📖 Documentation: [API Docs](API.md)
- 🐛 Issues: [GitHub Issues](https://github.com/vistara-apps/-app-development-7876/issues)

## Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Build process tested
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Rollback plan ready
- [ ] Health checks implemented
- [ ] Documentation updated
