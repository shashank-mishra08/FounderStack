import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-slate-950/50 backdrop-blur-sm mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                F
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                                FounderStack
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Empowering the next generation of founders with exclusive deals, tools, and resources. Build faster, spend less.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/deals" className="hover:text-indigo-400 transition-colors">Browse Deals</Link></li>
                            <li><Link href="/register" className="hover:text-indigo-400 transition-colors">For Startups</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Partners</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} LaunchPad Deals. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
