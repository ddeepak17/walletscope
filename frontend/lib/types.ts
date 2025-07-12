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

export interface ApiError {
  error: string;
  message?: string;
  details?: any;
} 