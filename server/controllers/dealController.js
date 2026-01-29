import Deal from '../models/Deal.js';

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public (some data hidden based on accessLevel logic if needed, but for now simple listing)
export const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find({ isActive: true });
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
export const getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (deal) {
            res.json(deal);
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a deal (Admin only or Seeding)
// @route   POST /api/deals
// @access  Private/Admin
export const createDeal = async (req, res) => {
    try {
        const deal = new Deal(req.body);
        const createdDeal = await deal.save();
        res.status(201).json(createdDeal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
