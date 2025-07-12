import { z } from 'zod';

// Mock MCP client for development - replace with actual @sei-js/mcp-server
export class MCPClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async walletTxHistory(address: string, limit: number = 100): Promise<any[]> {
    try {
      // For development, return mock data
      // In production, this would call the actual MCP server
      return this.getMockTransactions(address, limit);
    } catch (error) {
      console.error('Error fetching wallet transaction history:', error);
      throw new Error('Failed to fetch wallet transaction history');
    }
  }

  private getMockTransactions(address: string, limit: number): any[] {
    const transactions = [];
    const now = Date.now();
    
    for (let i = 0; i < limit; i++) {
      const timestamp = new Date(now - i * 24 * 60 * 60 * 1000).toISOString();
      transactions.push({
        hash: `sei_${Math.random().toString(36).substring(2, 15)}`,
        height: 1000000 + i,
        timestamp,
        fee: '0.001',
        gasUsed: 100000 + Math.floor(Math.random() * 50000),
        gasWanted: 150000 + Math.floor(Math.random() * 50000),
        memo: '',
        messages: [
          {
            type: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              from_address: address,
              to_address: `sei1${Math.random().toString(36).substring(2, 15)}`,
              amount: [
                {
                  denom: 'usei',
                  amount: (Math.random() * 1000).toFixed(0)
                }
              ]
            }
          }
        ]
      });
    }
    
    return transactions;
  }

  async getAccountBalance(address: string): Promise<string> {
    // Mock balance - in production this would query the actual blockchain
    return (Math.random() * 10000).toFixed(2);
  }
} 