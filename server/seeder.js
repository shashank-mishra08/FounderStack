import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deal from './models/Deal.js';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const deals = [
    {
        title: 'AWS Activate',
        description: 'Get $5,000 in AWS credits for 2 years. Valid for new startups.',
        partnerName: 'Amazon Web Services',
        logoUrl: '/logos/aws.svg',
        accessLevel: 'public',
        category: 'Cloud Services',
        discountDetails: '$5,000 Credits',
    },
    {
        title: 'Notion Plus',
        description: '6 months free of Notion Plus with AI. Organize your whole startup.',
        partnerName: 'Notion',
        logoUrl: '/logos/notion.svg',
        accessLevel: 'public',
        category: 'Productivity',
        discountDetails: '6 Months Free',
    },
    {
        title: 'Stripe Processing',
        description: '$20,000 in fee-free processing. Exclusive for high-growth startups.',
        partnerName: 'Stripe',
        logoUrl: '/logos/stripe.svg',
        accessLevel: 'locked',
        category: 'Finance',
        discountDetails: '$20k Fee-Free',
    },
    {
        title: 'HubSpot for Startups',
        description: '90% off HubSpot in year 1, 50% off in year 2.',
        partnerName: 'HubSpot',
        logoUrl: '/logos/hubspot.svg',
        accessLevel: 'locked',
        category: 'Marketing',
        discountDetails: '90% Off',
    },
    {
        title: 'Linear Standard',
        description: '6 free months of Linear Standard for up to 50 members.',
        partnerName: 'Linear',
        logoUrl: '/logos/linear.svg',
        accessLevel: 'public',
        category: 'Productivity',
        discountDetails: '6 Months Free',
    },
    {
        title: 'Vercel Pro',
        description: '3 months of Vercel Pro for free. Deploy efficiently.',
        partnerName: 'Vercel',
        logoUrl: '/logos/vercel.svg',
        accessLevel: 'locked',
        category: 'DevOps',
        discountDetails: '3 Months Pro',
    },
    {
        title: 'Google Cloud',
        description: '$100,000 in Google Cloud Credits for scalable startups.',
        partnerName: 'Google Cloud',
        logoUrl: '/logos/googlecloud.svg',
        accessLevel: 'locked',
        category: 'Cloud Services',
        discountDetails: '$100k Credits',
    },
    {
        title: 'Airtable',
        description: '$1,000 in credits for the low-code platform for building collaborative apps.',
        partnerName: 'Airtable',
        logoUrl: '/logos/airtable.svg',
        accessLevel: 'public',
        category: 'Productivity',
        discountDetails: '$1,000 Credits',
    },
    {
        title: 'Segment',
        description: 'Free Team Plan for up to 2 years. Collect and clean your customer data.',
        partnerName: 'Segment',
        logoUrl: '/logos/segment.svg',
        accessLevel: 'locked',
        category: 'Analytics',
        discountDetails: 'Free Team Plan',
    },
    {
        title: 'Miro',
        description: '3 Free Boards with unlimited team members. Collaborate visually.',
        partnerName: 'Miro',
        logoUrl: '/logos/miro.svg',
        accessLevel: 'public',
        category: 'Collaboration',
        discountDetails: '3 Free Boards',
    },
];

const seedData = async () => {
    try {
        await Deal.deleteMany();
        await Deal.insertMany(deals);
        console.log('Deals Seeded!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
