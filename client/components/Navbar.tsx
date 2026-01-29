'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                            F
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                            FounderStack
                        </span>
                    </Link>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <Link
                                href="/"
                                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/deals"
                                className={`text-sm font-medium transition-colors ${isActive('/deals') ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Explore Deals
                            </Link>
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="h-6 w-px bg-white/10 mx-2"></div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-400">
                                            {user.name.split(' ')[0]}
                                        </span>
                                        <button
                                            onClick={logout}
                                            className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-white/5 hover:border-white/10"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
