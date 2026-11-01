import express from 'express';
import { getPortfolioSettings, updatePortfolioSettings } from './portfolio.controller';

const router = express.Router();

router.get('/', getPortfolioSettings);
router.put('/', updatePortfolioSettings);

export default router;
