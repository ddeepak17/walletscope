import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import dotenv from 'dotenv';
import { z } from 'zod';

import { MCPClient } from './mcp-client';
import { AIAgent } from './ai-agent';
import { AnalyticsService } from './analytics';
import { AnalyzeRequest, AnalyzeResponse } from './types';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://walletscope.vercel.app',
  'https://walletscope-frontend.vercel.app',
  'https://walletscope-frontend-asd2vs5i9-ddeepak17s-projects.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.ip || 'unknown';
    await rateLimiter.consume(key);
    next();
  } catch (rejRes) {
    res.status(429).json({ error: 'Too many requests' });
  }
};

// Initialize services
const mcpClient = new MCPClient();
const aiAgent = new AIAgent(process.env.OPENAI_API_KEY || '');
const analyticsService = new AnalyticsService();

// Validation schema
const analyzeRequestSchema = z.object({
  address: z.string().min(1, 'Address is required')
});

// Health check endpoint
app.get('/api/health', (req: any, res: any) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main analysis endpoint
app.post('/api/analyze', rateLimiterMiddleware, async (req, res) => {
  try {
    // Validate request
    const validatedData = analyzeRequestSchema.parse(req.body);
    const { address } = validatedData;

    console.log(`Analyzing wallet: ${address}`);

    // Fetch transaction history
    const transactions = await mcpClient.walletTxHistory(address, 100);
    
    if (transactions.length === 0) {
      return res.json({
        inflow: '0',
        outflow: '0',
        opcodeBins: {},
        classification: 'idle',
        llmSummary: 'No transaction history found for this wallet address.'
      });
    }

    // Analyze wallet behavior
    const analysis = await analyticsService.analyzeWallet(address, transactions);
    
    // Use AI agent for real classification
    try {
      const behavior = await aiAgent.classifyWalletBehavior(transactions);
      analysis.classification = behavior.classification;
      analysis.llmSummary = await analyticsService.generateLLMSummary(transactions, behavior, analysis.opcodeBins);
    } catch (aiError) {
      console.error('AI analysis failed, using fallback:', aiError);
      // Keep the mock analysis if AI fails
    }

    console.log(`Analysis complete for ${address}: ${analysis.classification}`);

    res.json(analysis);

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid request data', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Optional: Telegram webhook endpoint
app.post('/api/telegram/webhook', (req: any, res: any) => {
  // TODO: Implement Telegram bot webhook
  res.json({ status: 'not implemented' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req: any, res: any) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Export app for testing
export { app };

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 WalletScope Backend running on port ${port}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
    console.log(`🔍 Analysis endpoint: http://localhost:${port}/api/analyze`);
  });
} 