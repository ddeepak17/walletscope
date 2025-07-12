import { Transaction, AnalyzeResponse } from './types';

export class AnalyticsService {
  calculateOpcodeBins(transactions: Transaction[]): Record<string, number> {
    const opcodeCounts: Record<string, number> = {};
    
    transactions.forEach(tx => {
      tx.messages.forEach(msg => {
        const opcode = msg.type.split('.').pop() || msg.type;
        opcodeCounts[opcode] = (opcodeCounts[opcode] || 0) + 1;
      });
    });
    
    return opcodeCounts;
  }

  calculateInflowOutflow(transactions: Transaction[], address: string): { inflow: string; outflow: string } {
    let inflow = 0;
    let outflow = 0;
    
    transactions.forEach(tx => {
      tx.messages.forEach(msg => {
        if (msg.type === '/cosmos.bank.v1beta1.MsgSend') {
          const fromAddress = msg.value?.from_address;
          const toAddress = msg.value?.to_address;
          const amount = msg.value?.amount?.[0]?.amount || '0';
          
          if (fromAddress === address) {
            outflow += parseFloat(amount) / 1000000; // Convert from usei to SEI
          }
          if (toAddress === address) {
            inflow += parseFloat(amount) / 1000000; // Convert from usei to SEI
          }
        }
      });
    });
    
    return {
      inflow: inflow.toFixed(6),
      outflow: outflow.toFixed(6)
    };
  }

  async generateLLMSummary(
    transactions: Transaction[], 
    behavior: any, 
    opcodeBins: Record<string, number>
  ): Promise<string> {
    const topOperations = Object.entries(opcodeBins)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([opcode, count]) => `${opcode}: ${count}`)
      .join(', ');

    const summary = `This wallet has been classified as a **${behavior.classification}** with ${behavior.confidence * 100}% confidence.

**Activity Overview:**
- Total transactions: ${behavior.totalTransactions}
- Total volume: ${behavior.totalVolume} SEI
- Average transaction size: ${behavior.averageTransactionSize} SEI
- Most active period: ${behavior.mostActivePeriod}

**Top Operations:** ${topOperations}

**Analysis:** ${behavior.reasoning}

This wallet shows ${behavior.classification === 'idle' ? 'minimal' : 'active'} engagement with the Sei ecosystem, with ${behavior.commonOperations.length > 0 ? behavior.commonOperations.join(', ') : 'no specific'} patterns detected.`;

    return summary;
  }

  async analyzeWallet(address: string, transactions: Transaction[]): Promise<AnalyzeResponse> {
    const opcodeBins = this.calculateOpcodeBins(transactions);
    const { inflow, outflow } = this.calculateInflowOutflow(transactions, address);
    
    // For now, return mock classification - this will be replaced by AI agent
    const mockBehavior = {
      classification: 'idle' as const,
      confidence: 0.5,
      reasoning: 'Mock analysis for development',
      totalTransactions: transactions.length,
      totalVolume: '0',
      averageTransactionSize: '0',
      mostActivePeriod: 'Unknown',
      commonOperations: []
    };
    
    const llmSummary = await this.generateLLMSummary(transactions, mockBehavior, opcodeBins);
    
    return {
      inflow,
      outflow,
      opcodeBins,
      classification: mockBehavior.classification,
      llmSummary
    };
  }
} 