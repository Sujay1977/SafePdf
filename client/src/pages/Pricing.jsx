import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { DodoPayments } from 'dodopayments-checkout';
import SEO from '../components/SEO';
import ClientOnly from '../components/ClientOnly';


const Pricing = () => {
    const handleSupportMe = (e) => {
        e.preventDefault();

        const publicKey = import.meta.env.VITE_DODO_PUBLIC_KEY;
        const productId = 'pdt_0NWNP0K7PftXJmjaCc5fF'; // LIVE Product ID

        try {
            if (publicKey) {
                DodoPayments.Initialize({
                    publicKey: publicKey,
                    mode: 'live',
                });
            }

            DodoPayments.Checkout.open({
                productId: productId,
                quantity: 1
            });
        } catch (error) {
            console.error("Dodo Payments checkout error:", error);
            window.open(`https://checkout.dodopayments.com/buy/${productId}`, "_blank");
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900">
            <SEO
                title="Free PDF Tools Pricing | SafePDF"
                description="SafePDF is free forever. No hidden fees, no subscriptions, and 100% client-side privacy for everyone."
            />

            <div className="w-full py-20 px-4">
                <div className="max-w-4xl mx-auto flex flex-col gap-16">
                    <div className="text-center flex flex-col gap-6">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            No credit cards. No subscriptions. No hidden fees.
                        </p>
                    </div>

                    <div className="relative max-w-md mx-auto w-full">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25"></div>

                        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Free Forever</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1">For everyone</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
                                    <span className="text-slate-500 dark:text-slate-400 block text-sm">/ month</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                {[
                                    "Unlimited PDF Processing",
                                    "Access to All 12+ Tools",
                                    "No File Size Limits",
                                    "No Watermarks",
                                    "100% Client-Side Privacy",
                                    "No Server Uploads",
                                    "Offline Capable via PWA"
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                            <ClientOnly>
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            </ClientOnly>
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/"
                                className="block w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-center text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                Start Using for Free
                            </Link>

                            <button
                                onClick={handleSupportMe}
                                className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-amber-400 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/10 text-slate-900 dark:text-white font-bold text-center text-lg transition-all duration-300 group"
                            >
                                <Heart className="text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform duration-300" size={20} />
                                <span>Support the Project</span>
                            </button>

                            <p className="text-center text-sm text-slate-500 mt-6">
                                We are supported by community donations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
