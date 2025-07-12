# WalletScope 🔍

Lightning-fast behavioural analytics for any Sei wallet using AI-powered analysis.

## 🚀 Features

- **⚡ Lightning Fast**: Get wallet insights in under 1 second with Sei's 400ms finality
- **🤖 AI Powered**: Claude Sonnet 3.7 analyzes transaction patterns to classify wallet behavior
- **📊 Rich Analytics**: Visual charts and detailed summaries of wallet activity
- **🔒 Privacy First**: No PII stored, rate-limited API endpoints
- **🌐 Modern UI**: Beautiful, responsive interface built with Next.js 14 and Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Agent      │
│   (Next.js 14)  │◄──►│   (Express)     │◄──►│   (Claude 3.7)  │
│   React 18      │    │   TypeScript    │    │   OpenAI API    │
│   Recharts      │    │   MCP Server    │    │   Function Call  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Sei MCP Kit   │
                       │   Real-time     │
                       │   Blockchain    │
                       │   Data Feed     │
                       └─────────────────┘
```

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 14, React 18, Recharts | Modern UI with interactive charts |
| **Backend** | Node.js 20, Express, TypeScript | API server with MCP integration |
| **AI Agent** | Claude Sonnet 3.7 via OpenAI API | Wallet behavior classification |
| **Data Layer** | Sei MCP Kit | Real-time blockchain data access |
| **Styling** | Tailwind CSS | Modern, responsive design |
| **Deployment** | Vercel (Frontend) + Render/Fly.io (Backend) | Scalable hosting |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- OpenAI API key (for AI analysis)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd walletscope
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your OpenAI API key
   
   # Frontend (optional)
   cp frontend/.env.example frontend/.env.local
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually
   pnpm dev:backend  # Backend on http://localhost:3001
   pnpm dev:frontend # Frontend on http://localhost:3000
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Endpoints

### Health Check
```http
GET /api/health
```
Returns server status and version information.

### Wallet Analysis
```http
POST /api/analyze
Content-Type: application/json

{
  "address": "sei1..."
}
```

**Response:**
```json
{
  "inflow": "1500.500000",
  "outflow": "750.250000",
  "opcodeBins": {
    "MsgSend": 45,
    "MsgSwap": 12,
    "MsgStake": 8
  },
  "classification": "dex_farmer",
  "llmSummary": "This wallet has been classified as a **dex_farmer**..."
}
```

## 🎯 Wallet Classifications

WalletScope classifies wallets into four categories:

- **🎯 Airdrop Hunter**: Wallets that frequently interact with airdrop campaigns, testnets, or new protocols
- **🌾 DEX Farmer**: Wallets that actively trade on DEXs, provide liquidity, or engage in yield farming
- **💼 Exchange Hot Wallet**: Wallets with high-frequency trading patterns typical of exchange operations
- **😴 Idle**: Wallets with minimal activity, mostly holding or occasional transfers

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
MCP_SERVER_URL=http://localhost:3001
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Fly.io)
1. Create a new service
2. Set environment variables
3. Deploy with Node.js 20 runtime

## 📈 Performance Targets

- **Latency**: <1 second p95 response time
- **Throughput**: 100+ concurrent users
- **Cost**: ≤$15/month (Vercel Hobby + Render free tier)
- **Uptime**: 99.9% availability

## 🔒 Security

- CORS locked to domain
- Rate limiting on `/api/analyze` endpoint
- No PII stored
- Input validation with Zod
- Helmet.js security headers

## 🧪 Development

### Running Tests
```bash
pnpm test        # Run all tests
pnpm test:backend # Backend tests only
pnpm test:frontend # Frontend tests only
```

### Linting
```bash
pnpm lint        # Run all linters
pnpm lint:backend # Backend linting
pnpm lint:frontend # Frontend linting
```

### Type Checking
```bash
pnpm type-check  # TypeScript type checking
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sei Network** for the MCP Kit and blockchain infrastructure
- **Anthropic** for Claude Sonnet 3.7 AI capabilities
- **Vercel** for frontend hosting
- **Render/Fly.io** for backend hosting

## 📞 Support

For support, email support@walletscope.com or join our Discord community.

---

**Built with ❤️ for the Sei Hackathon** 