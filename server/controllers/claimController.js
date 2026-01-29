import Claim from '../models/Claim.js';
import Deal from '../models/Deal.js';

// @desc    Claim a deal
// @route   POST /api/claims
// @access  Private
export const claimDeal = async (req, res) => {
    try {
        const { dealId } = req.body;

        const deal = await Deal.findById(dealId);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (!deal.isActive) {
            return res.status(400).json({ message: 'Deal is not active' });
        }

        // Check if locked and user verification (Assume user in req.user from protect middleware)
        if (deal.accessLevel === 'locked' && !req.user.isVerified) {
            return res.status(403).json({ message: 'You must be verified to claim this deal' });
        }

        const claimExists = await Claim.findOne({
            userId: req.user._id,
            dealId,
        });

        if (claimExists) {
            return res.status(400).json({ message: 'You have already claimed this deal' });
        }

        const claim = await Claim.create({
            userId: req.user._id,
            dealId,
            status: 'approved', // Auto-approve for now, can be pending
        });

        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user claims
// @route   GET /api/claims/my-claims
// @access  Private
export const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ userId: req.user._id }).populate('dealId');
        // Filter out claims where the deal has been deleted (dealId is null)
        const validClaims = claims.filter(claim => claim.dealId !== null);
        res.json(validClaims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
