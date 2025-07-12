'use client';

import { TrendingUp, TrendingDown, Activity, Info } from 'lucide-react';
import { AnalyzeResponse } from '../lib/types';

interface AnalyticsSummaryProps {
  data: AnalyzeResponse;
}

const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'airdrop_hunter':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'dex_farmer':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'exchange_hot_wallet':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'idle':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getClassificationIcon = (classification: string) => {
  switch (classification) {
    case 'airdrop_hunter':
      return '🎯';
    case 'dex_farmer':
      return '🌾';
    case 'exchange_hot_wallet':
      return '💼';
    case 'idle':
      return '😴';
    default:
      return '❓';
  }
};

export default function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const { inflow, outflow, classification, llmSummary } = data;

  return (
    <div className="space-y-6">
      {/* Classification Badge */}
      <div className="flex items-center justify-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getClassificationColor(classification)}`}>
          <span className="text-lg mr-2">{getClassificationIcon(classification)}</span>
          <span className="font-medium capitalize">
            {classification.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inflow</p>
              <p className="text-2xl font-bold text-gray-900">{parseFloat(inflow).toFixed(2)} SEI</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Outflow</p>
              <p className="text-2xl font-bold text-gray-900">{parseFloat(outflow).toFixed(2)} SEI</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-sei-100 rounded-lg">
            <Activity className="h-5 w-5 text-sei-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: llmSummary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How is this analysis generated?</p>
            <p>
              WalletScope uses Claude Sonnet 3.7 to analyze transaction patterns, 
              volume flows, and operation types to classify wallet behavior. 
              The analysis is based on the last 100 transactions and provides 
              insights into wallet activity patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 