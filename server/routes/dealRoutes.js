import express from 'express';
import { getDeals, getDealById, createDeal } from '../controllers/dealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDeals);
router.get('/:id', getDealById);
router.post('/', protect, createDeal); // Ideally restrict to admin, but for now protect is enough

export default router;
