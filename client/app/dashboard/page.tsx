'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '../../lib/api';
import { User, ShieldCheck, ShieldAlert, Award, Calendar } from 'lucide-react';

interface Claim {
    _id: string;
    dealId: {
        title: string;
        partnerName: string;
        logoUrl?: string; // Optional if not populated or missing
    };
    status: string;
    claimDate: string;
}

export default function Dashboard() {
    const { user, loading } = useAuth();
    const [claims, setClaims] = useState<Claim[]>([]);
    const [isLoadingClaims, setIsLoadingClaims] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchClaims = async () => {
                try {
                    const { data } = await api.get('/claims/my-claims');
                    setClaims(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoadingClaims(false);
                }
            };
            fetchClaims();
        }
    }, [user]);

    if (loading) return <div className="text-center mt-20 text-slate-400">Loading profile...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="glass-liquid p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-500/20 shrink-0">
                        {user?.name.charAt(0)}
                    </div>

                    <div className="text-center sm:text-left flex-grow">
                        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight">{user?.name}</h1>
                            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20">
                                {user?.role === 'admin' ? 'Admin' : 'Member'}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-5">{user?.email}</p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold">
                            {user?.isVerified ? (
                                <>
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span className="text-slate-300">Verified Founder</span>
                                </>
                            ) : (
                                <>
                                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                                    <span className="text-slate-300">Unverified Account</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-3 mb-6 px-1">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">My Claimed Deals</h3>
                </div>

                {isLoadingClaims ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse"></div>)}
                    </div>
                ) : claims.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {claims.map((claim) => (
                            // Safety check: ensure dealId exists before rendering
                            claim.dealId && (
                                <div key={claim._id} className="glass-liquid p-5 rounded-2xl flex flex-col h-full group">
                                    <div className="flex justify-between items-start mb-5">
                                        <div>
                                            <h4 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors mb-0.5">{claim.dealId.title}</h4>
                                            <p className="text-xs text-slate-400">{claim.dealId.partnerName}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            {claim.status}
                                        </span>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" />
                                        <span>Claimed: {new Date(claim.claimDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 glass-liquid rounded-2xl">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <Award className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="text-slate-400 mb-6 text-sm">You haven't claimed any deals yet.</p>
                        <Link href="/deals" className="inline-flex px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                            Explore Deals
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
