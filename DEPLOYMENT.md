# WalletScope Deployment Guide

This guide covers deploying WalletScope to production environments.

## 🚀 Quick Deployment

### Frontend (Vercel)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Vercel will auto-deploy on push to main branch
   - Custom domain can be added in settings

### Backend (Render)

1. **Create Service**
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository

2. **Configuration**
   - **Name**: walletscope-backend
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-domain.com
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_BASE_URL=https://api.openai.com/v1
   ```

4. **Deploy**
   - Render will auto-deploy on push to main branch
   - Get your backend URL from the dashboard

### Alternative: Backend (Fly.io)

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   fly auth login
   ```

2. **Create App**
   ```bash
   cd backend
   fly launch
   ```

3. **Set Secrets**
   ```bash
   fly secrets set OPENAI_API_KEY=your_key
   fly secrets set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   fly deploy
   ```

## 🔧 Environment Setup

### Required Environment Variables

**Backend (.env)**
```env
# Server
NODE_ENV=production
PORT=10000

# CORS
FRONTEND_URL=https://your-frontend-domain.com

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1

# Rate Limiting
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 📊 Monitoring

### Health Checks
- Backend: `GET /api/health`
- Frontend: Vercel provides built-in monitoring

### Logs
- **Vercel**: Dashboard → Functions → Logs
- **Render**: Dashboard → Logs
- **Fly.io**: `fly logs`

### Performance
- Monitor response times via `/api/health`
- Set up alerts for 5xx errors
- Track API usage and costs

## 🔒 Security Checklist

- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Input validation active
- [ ] No sensitive data in logs

## 💰 Cost Optimization

### Vercel (Frontend)
- **Hobby Plan**: $0/month (good for hackathon)
- **Pro Plan**: $20/month (for production)

### Render (Backend)
- **Free Tier**: $0/month (sleeps after inactivity)
- **Starter Plan**: $7/month (always on)

### OpenAI API
- **Claude 3.7**: ~$0.002 per request
- **1000 requests**: ~$2/month
- **10,000 requests**: ~$20/month

### Total Estimated Cost
- **Development**: $0/month
- **Production (low traffic)**: $7-27/month
- **Production (high traffic)**: $20-50/month

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Ensure frontend domain is in CORS whitelist

2. **API Timeouts**
   - Increase timeout in frontend API client
   - Check backend logs for slow queries

3. **Build Failures**
   - Verify Node.js version (20+)
   - Check TypeScript compilation
   - Ensure all dependencies installed

4. **Environment Variables**
   - Double-check all required variables set
   - Restart services after changing env vars

### Debug Commands

```bash
# Check backend health
curl https://your-backend.com/api/health

# Test API endpoint
curl -X POST https://your-backend.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"sei1test..."}'

# View logs
fly logs  # or Render dashboard
```

## 📈 Scaling

### Horizontal Scaling
- **Vercel**: Automatic with Pro plan
- **Render**: Add instances in dashboard
- **Fly.io**: `fly scale count 3`

### Database (Future)
- Add PostgreSQL for persistent storage
- Use Supabase or Neon for managed DB

### Caching
- Add Redis for session storage
- Implement response caching for repeated queries

## 🔄 CI/CD

### GitHub Actions (Optional)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Add deployment steps
```

## 📞 Support

For deployment issues:
1. Check service logs
2. Verify environment variables
3. Test endpoints manually
4. Contact platform support if needed

---

**Happy Deploying! 🚀** 