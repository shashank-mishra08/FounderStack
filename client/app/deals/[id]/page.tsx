'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import api from '../../../lib/api';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface Deal {
    _id: string;
    title: string;
    description: string;
    partnerName: string;
    accessLevel: 'public' | 'locked';
    category: string;
    discountDetails: string;
}

export default function DealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const { data } = await api.get(`/deals/${id}`);
                setDeal(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeal();
    }, [id]);

    const handleClaim = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setClaiming(true);
        setMessage(null);

        try {
            await api.post('/claims', { dealId: id });
            setMessage({ type: 'success', text: 'Deal claimed successfully! Added to your dashboard.' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to claim deal' });
        } finally {
            setClaiming(false);
        }
    };

    if (loading) return <div className="text-center mt-24">Loading deal...</div>;
    if (!deal) return <div className="text-center mt-24">Deal not found</div>;

    const isLocked = deal.accessLevel === 'locked' && (!user || !user.isVerified);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <Link href="/deals" className="text-gray-500 hover:text-white mb-6 inline-block transition-colors">&larr; Back to Deals</Link>

            <div className="glass rounded-3xl overflow-hidden border border-white/10 relative">
                {/* Banner/Header */}
                <div className="h-48 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 relative">
                    <div className="absolute -bottom-10 left-8 md:left-12">
                        <div className="w-24 h-24 rounded-2xl bg-gray-800 shadow-xl border-4 border-gray-900 flex items-center justify-center text-3xl font-bold">
                            {deal.partnerName.charAt(0)}
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-12 px-8 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{deal.title}</h1>
                            <p className="text-xl text-indigo-400 font-medium">{deal.discountDetails}</p>
                            <div className="flex items-center gap-3 mt-4 text-sm text-gray-400">
                                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">{deal.category}</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">{deal.partnerName}</span>
                            </div>
                        </div>

                        {deal.accessLevel === 'locked' && (
                            <div className="flex items-center gap-2 mt-2 md:mt-0 text-yellow-400 bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500/20">
                                <Lock className="w-5 h-5" />
                                <span className="text-sm font-medium">Verification Required</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">About this Deal</h3>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            {deal.description}
                        </p>

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'
                                    }`}
                            >
                                {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                {message.text}
                            </motion.div>
                        )}

                        <div className="flex flex-col gap-4">
                            {isLocked ? (
                                <div className="text-center p-6 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                    <Lock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                    <h4 className="text-lg font-semibold text-gray-300">Access Restricted</h4>
                                    <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                        This deal is exclusive to verified founders. Please complete your profile verification to unlock it.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={handleClaim}
                                    disabled={claiming || (message?.type === 'success')}
                                    className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${message?.type === 'success'
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {claiming ? 'Processing...' : message?.type === 'success' ? 'Claimed' : 'Claim Deal'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import Link from 'next/link';
