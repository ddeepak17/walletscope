import request from 'supertest';
import express from 'express';
import { app } from './index';

describe('WalletScope Backend', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('should analyze wallet with valid address', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ address: 'sei1testaddress123456789012345678901234567890' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('inflow');
    expect(response.body).toHaveProperty('outflow');
    expect(response.body).toHaveProperty('opcodeBins');
    expect(response.body).toHaveProperty('classification');
    expect(response.body).toHaveProperty('llmSummary');
  });

  it('should reject invalid address', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ address: 'invalid-address' });
    
    expect(response.status).toBe(400);
  });
}); 