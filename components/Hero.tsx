// components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Shuaib & Ashar
                    </h1>
                    <motion.p
                        className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 relative overflow-hidden tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1.0 }}
                    >
                        Full Stack Developers & Creative Problem Solvers

                        {/* Dramatic ripple */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-indigo-600/50 to-purple-600/40 rounded-[100%] blur-[4rem] -z-10 pointer-events-none"
                            initial={{ scale: 0.3, opacity: 0 }}
                            animate={{
                                scale: [0.3, 2.5, 1.3],
                                opacity: [0, 1.0, 0.4],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeOut",
                                times: [0, 0.35, 1],
                                repeat: 2,
                                repeatDelay: 1.2,
                            }}
                        />

                        {/* Stronger text glow */}
                        <span className="relative z-10 drop-shadow-[0_0_20px_rgba(79,70,229,0.7)] dark:drop-shadow-[0_0_25px_rgba(99,102,241,0.8)]">
                            Full Stack Developers & Creative Problem Solvers
                        </span>
                    </motion.p>
                    <div className="flex gap-4 justify-center">
                        <a href="#projects" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            View Projects
                        </a>
                        <a href="#contact" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
