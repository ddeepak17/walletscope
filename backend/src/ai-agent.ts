import OpenAI from 'openai';
import { WalletBehavior } from './types';

export class AIAgent {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
    });
  }

  async classifyWalletBehavior(transactions: any[]): Promise<WalletBehavior> {
    try {
      const transactionSummary = this.summarizeTransactions(transactions);
      
      const prompt = `Analyze the following Sei wallet transaction data and classify the wallet behavior:

Transaction Summary:
${transactionSummary}

Please classify this wallet as one of the following types:
- airdrop_hunter: Wallets that frequently interact with airdrop campaigns, testnets, or new protocols
- dex_farmer: Wallets that actively trade on DEXs, provide liquidity, or engage in yield farming
- exchange_hot_wallet: Wallets with high-frequency trading patterns typical of exchange operations
- idle: Wallets with minimal activity, mostly holding or occasional transfers

Provide your analysis in the following JSON format:
{
  "classification": "one_of_the_above_types",
  "confidence": 0.85,
  "reasoning": "Detailed explanation of why this classification was chosen",
  "totalTransactions": 42,
  "totalVolume": "15000.50",
  "averageTransactionSize": "357.15",
  "mostActivePeriod": "2024-01",
  "commonOperations": ["transfer", "swap", "stake"]
}`;

      const response = await this.openai.chat.completions.create({
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'system',
            content: 'You are a blockchain analytics expert specializing in wallet behavior classification. Provide accurate, data-driven analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI model');
      }

      // Parse the JSON response
      const analysis = JSON.parse(content);
      
      return {
        totalTransactions: analysis.totalTransactions || transactions.length,
        totalVolume: analysis.totalVolume || '0',
        averageTransactionSize: analysis.averageTransactionSize || '0',
        mostActivePeriod: analysis.mostActivePeriod || 'Unknown',
        commonOperations: analysis.commonOperations || [],
        classification: analysis.classification || 'idle',
        confidence: analysis.confidence || 0.5,
        reasoning: analysis.reasoning || 'Insufficient data for classification'
      };

    } catch (error) {
      console.error('Error in AI classification:', error);
      
      // Fallback classification
      return {
        totalTransactions: transactions.length,
        totalVolume: '0',
        averageTransactionSize: '0',
        mostActivePeriod: 'Unknown',
        commonOperations: [],
        classification: 'idle',
        confidence: 0.1,
        reasoning: 'Error in AI analysis, defaulting to idle classification'
      };
    }
  }

  private summarizeTransactions(transactions: any[]): string {
    if (transactions.length === 0) {
      return 'No transactions found';
    }

    const messageTypes = transactions.flatMap(tx => 
      tx.messages?.map((msg: any) => msg.type) || []
    );
    
    const typeCounts = messageTypes.reduce((acc: Record<string, number>, type: string) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const totalVolume = transactions.reduce((sum, tx) => {
      const amounts = tx.messages?.flatMap((msg: any) => 
        msg.value?.amount || []
      ) || [];
      return sum + amounts.reduce((msgSum: number, amt: any) => 
        msgSum + (parseFloat(amt.amount) || 0), 0
      );
    }, 0);

    return `
Total Transactions: ${transactions.length}
Total Volume (usei): ${totalVolume.toFixed(2)}
Message Type Distribution: ${JSON.stringify(typeCounts, null, 2)}
Time Range: ${transactions[transactions.length - 1]?.timestamp} to ${transactions[0]?.timestamp}
Average Gas Used: ${(transactions.reduce((sum, tx) => sum + (tx.gasUsed || 0), 0) / transactions.length).toFixed(0)}
    `.trim();
  }
} 