'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <Hero3D />

      <main className="z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            For Founders, Indie Hackers & Builders
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Scale Your Startup <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
              With Exclusive Deals
            </span>
          </h1>

          <p className="mt-4 max-w-lg mx-auto text-base text-slate-400 mb-8 leading-relaxed">
            Stop paying full price for tools. Access
            <span className="text-white font-semibold"> $50,000+ </span>
            in savings on AWS, Stripe, Notion, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/deals"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 group"
            >
              Explore Deals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-white/5 text-white text-sm font-medium border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2"
            >
              Get Started Free
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Features/Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 pt-16 border-t border-white/5"
        >
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-10">Powering next-gen startups built on</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {['AWS', 'Google Cloud', 'Stripe', 'Notion', 'HubSpot', 'Vercel'].map((brand) => (
              <span key={brand} className="text-2xl sm:text-3xl font-bold text-white hover:text-indigo-300 transition-colors cursor-default">{brand}</span>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
