"use client";
import React from 'react';
import Header from "@/components/Header";
import ReviewPricing from "@/components/Review/ReviewPricing";
import { motion } from "framer-motion";
import { BsArrowRight, BsWhatsapp, BsCalendarCheck, BsPen, BsBoxSeam, BsSend } from 'react-icons/bs';

export default function ReviewPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#171717] transition-colors duration-500">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400"
                    >
                        Boost je Online Reputatie
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
                    >
                        Start met het verzamelen van 5-sterren reviews via onze slimme NFC-tools en software.
                        Professioneel ontworpen voor jouw merk.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Section */}
            <ReviewPricing />

            {/* Process Explanation Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 dark:text-[var(--secondary)] font-bold tracking-wider uppercase text-sm">Onze Werkwijze</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                            Van Bestelling tot Review-Magneet
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

                        {[
                            { icon: BsBoxSeam, title: "1. Bestel of Bel", desc: "Bestel direct of plan eerst een gratis adviesgesprek." },
                            { icon: BsSend, title: "2. Upload", desc: "Je ontvangt een mail om je logo en wensen te sturen." },
                            { icon: BsPen, title: "3. Design", desc: "Binnen 7 dagen ontvang je professionele ontwerpen." },
                            { icon: BsWhatsapp, title: "4. Feedback", desc: "Jij geeft akkoord of vraagt aanpassingen." },
                            { icon: BsCheckCircleFill, title: "5. Productie", desc: "Na akkoord starten we productie (+- 1 week)." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:scale-110 transition-all">
                                    <step.icon size={32} className="text-blue-600 dark:text-[var(--secondary)]" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Free Consult CTA Section */}
            <section className="py-20 bg-white dark:bg-[#171717]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-orange-600 dark:to-orange-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Twijfel je welk pakket het beste is?
                            </h2>
                            <p className="text-lg text-blue-100 dark:text-orange-100 mb-8 max-w-2xl mx-auto">
                                Plan een gratis strategie gesprek van 15 minuten. We kijken samen wat voor jouw situatie de meeste reviews gaat opleveren.
                            </p>

                            <a
                                href="https://calendly.com/tim-studiolee"
                                target="_blank"
                                className="inline-flex items-center gap-3 bg-white text-blue-700 dark:text-orange-700 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg group"
                            >
                                <BsCalendarCheck size={20} />
                                Plan Gratis Consult
                                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

// Helper for icon import in map
import { BsCheckCircleFill } from 'react-icons/bs';
