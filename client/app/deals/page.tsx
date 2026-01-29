'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import api from '../../lib/api';
import { Search, Lock, Unlock, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

interface Deal {
    _id: string;
    title: string;
    partnerName: string;
    category: string;
    discountDetails: string;
    accessLevel: 'public' | 'locked';
}

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await api.get('/deals');
                setDeals(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    const filteredDeals = deals.filter(deal => {
        const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) ||
            deal.partnerName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || deal.category === filter;
        return matchesSearch && matchesFilter;
    });

    const categories = ['All', ...Array.from(new Set(deals.map(d => d.category)))];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Premium Deals</span>
                </h1>
                <p className="text-slate-400 text-sm max-w-lg mx-auto">
                    Curated offers from world-class tools to help you build faster and cheaper.
                </p>
            </motion.div>

            <div className="flex flex-col gap-6 mb-10">
                <div className="relative w-full max-w-lg mx-auto group">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 focus:border-indigo-500/50 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600 text-white text-sm"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${filter === cat
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredDeals.map((deal, index) => (
                            <motion.div
                                key={deal._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Link href={`/deals/${deal._id}`} className="block h-full group">
                                    <div className="glass-liquid h-full p-5 rounded-2xl flex flex-col items-start relative z-10">
                                        <div className="flex justify-between items-start w-full mb-5">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-xl font-bold text-white border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                                {deal.partnerName.charAt(0)}
                                            </div>
                                            {deal.accessLevel === 'locked' ? (
                                                <div className="px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Lock className="w-3 h-3" /> LOCKED
                                                </div>
                                            ) : (
                                                <div className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Unlock className="w-3 h-3" /> PUBLIC
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 w-full">
                                            <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{deal.title}</h3>
                                            <p className="text-slate-400 text-xs mb-3">{deal.partnerName}</p>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="h-px bg-white/5 flex-1"></div>
                                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{deal.category}</span>
                                                <div className="h-px bg-white/5 flex-1"></div>
                                            </div>

                                            <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 text-center group-hover:bg-indigo-500/5 group-hover:border-indigo-500/20 transition-all">
                                                <span className="block text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                                                    {deal.discountDetails}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full mt-5 flex items-center justify-center gap-1 text-xs font-semibold text-indigo-400 opacity-80 group-hover:opacity-100 transition-all duration-300">
                                            View Details
                                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
