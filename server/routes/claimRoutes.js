import express from 'express';
import { claimDeal, getMyClaims } from '../controllers/claimController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, claimDeal);
router.get('/my-claims', protect, getMyClaims);

export default router;
