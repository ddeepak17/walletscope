# 🚀 WalletScope Deployment Guide

## Current Status
- ✅ **Backend**: Deployed to Render at `https://walletscope-backend1.onrender.com`
- 🔄 **Frontend**: Ready for Vercel deployment

## Frontend Deployment to Vercel

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your `walletscope` repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 2: Set Environment Variables
In the Vercel project settings, add:
```
NEXT_PUBLIC_API_URL=https://walletscope-backend1.onrender.com
```

### Step 3: Deploy
Click "Deploy" and wait for the build to complete.

## Backend Configuration (Already Done)

### Render Settings
- **Build Command**: `cd backend && pnpm install && pnpm run build`
- **Start Command**: `cd backend && pnpm start`
- **Health Check Path**: `/api/health`
- **Environment Variables**:
  - `OPENAI_API_KEY`: Your OpenAI API key
  - `FRONTEND_URL`: Will be set to your Vercel URL after deployment

## Testing Your Deployment

### Backend Health Check
```bash
curl https://walletscope-backend1.onrender.com/api/health
```

### Backend Analysis Test
```bash
curl -X POST https://walletscope-backend1.onrender.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"address": "sei1testaddress123456789012345678901234567890"}'
```

### Frontend Test
After Vercel deployment, visit your frontend URL and test with a Sei wallet address.

## Post-Deployment Steps

1. **Update Backend CORS**: After getting your Vercel URL, update the backend CORS settings in Render dashboard
2. **Test Full Integration**: Use the frontend to analyze a real Sei wallet
3. **Record Demo Video**: Show the complete user flow
4. **Submit to Hackathon**: Include both URLs in your submission

## URLs to Include in Submission
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://walletscope-backend1.onrender.com`
- **GitHub**: `https://github.com/ddeepak17/walletscope`

## Troubleshooting

### Common Issues
1. **CORS Errors**: Make sure the Vercel URL is added to backend CORS settings
2. **Build Failures**: Check that all dependencies are properly installed
3. **API Timeouts**: The backend has rate limiting (10 requests per minute)

### Debug Commands
```bash
# Test backend locally
cd backend && npm run dev

# Test frontend locally
cd frontend && NEXT_PUBLIC_API_URL=https://walletscope-backend1.onrender.com npm run dev
```

## Next Steps After Deployment
1. ✅ Deploy frontend to Vercel
2. 🔄 Update backend CORS with Vercel URL
3. 🔄 Test full integration
4. 🔄 Record demo video
5. 🔄 Submit to hackathon

Good luck with your hackathon submission! 🎉 