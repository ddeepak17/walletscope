'use client';

import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface WalletInputProps {
  onAnalyze: (address: string) => void;
  isLoading: boolean;
}

export default function WalletInput({ onAnalyze, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateAddress = (addr: string): boolean => {
    // Basic Sei address validation (starts with 'sei1' and has correct length)
    const seiAddressRegex = /^sei1[a-zA-Z0-9]{38}$/;
    return seiAddressRegex.test(addr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!validateAddress(address.trim())) {
      setError('Please enter a valid Sei wallet address (starts with sei1)');
      return;
    }

    onAnalyze(address.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Sei wallet address (e.g., sei1...)"
            className="input-field pl-10 pr-4 py-3 text-lg"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="loading-spinner"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            'Analyze Wallet'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Enter any Sei wallet address to get instant behavioral analytics</p>
      </div>
    </div>
  );
} 