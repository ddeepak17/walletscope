'use client';

import { useState } from 'react';
import { AlertCircle, Zap } from 'lucide-react';
import WalletInput from '../components/WalletInput';
import AnalyticsChart from '../components/AnalyticsChart';
import AnalyticsSummary from '../components/AnalyticsSummary';
import { analyzeWallet } from '../lib/api';
import { AnalyzeResponse } from '../lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);

  const handleAnalyze = async (address: string) => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await analyzeWallet(address);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-sei-600 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WalletScope</h1>
            </div>
            <div className="text-sm text-gray-500">
              Sei Wallet Analytics
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lightning-Fast Wallet Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant behavioral insights for any Sei wallet using AI-powered analysis
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-12">
          <WalletInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Analysis Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {analysis && (
          <div className="space-y-8 animate-fade-in">
            {/* Summary */}
            <div className="max-w-4xl mx-auto">
              <AnalyticsSummary data={analysis} />
            </div>

            {/* Charts */}
            <div className="max-w-6xl mx-auto">
              <AnalyticsChart 
                data={analysis.opcodeBins} 
                title="Transaction Operation Distribution" 
              />
            </div>
          </div>
        )}

        {/* Features Section */}
        {!analysis && !isLoading && (
          <div className="max-w-4xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-sei-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-sei-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get wallet insights in under 1 second with Sei's 400ms finality
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Powered</h3>
                <p className="text-gray-600">
                  Claude Sonnet 3.7 analyzes patterns to classify wallet behavior
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich Analytics</h3>
                <p className="text-gray-600">
                  Visual charts and detailed summaries of wallet activity
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built for the Sei Hackathon • Powered by Claude Sonnet 3.7</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 