import express from 'express';
import { logger } from '../utils/logger';

const router = express.Router();

// GET /api/crypto/prices
router.get('/prices', async (req, res) => {
  try {
    logger.info('Fetching crypto prices');
    
    // Mock data for now
    const prices = {
      BTC: 45000,
      ETH: 3000,
      KCH: 0.01,
      USDC: 1.00
    };
    
    res.json({
      success: true,
      data: prices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error fetching prices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prices'
    });
  }
});

export default router;