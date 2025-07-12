export interface AnalyzeRequest {
  address: string;
}

export interface AnalyzeResponse {
  inflow: string; // SEI
  outflow: string; // SEI
  opcodeBins: Record<string, number>;
  classification: 'airdrop_hunter' | 'dex_farmer' | 'exchange_hot_wallet' | 'idle';
  llmSummary: string;
}

export interface Transaction {
  hash: string;
  height: number;
  timestamp: string;
  fee: string;
  gasUsed: number;
  gasWanted: number;
  memo: string;
  messages: Message[];
}

export interface Message {
  type: string;
  value: any;
}

export interface WalletBehavior {
  totalTransactions: number;
  totalVolume: string;
  averageTransactionSize: string;
  mostActivePeriod: string;
  commonOperations: string[];
  classification: 'airdrop_hunter' | 'dex_farmer' | 'exchange_hot_wallet' | 'idle';
  confidence: number;
  reasoning: string;
} 