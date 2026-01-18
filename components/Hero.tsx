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
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 relative overflow-hidden"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.8 }} // slight delay after name animation
                    >
                        Full Stack Developers & Creative Problem Solvers

                        {/* Ripple glow layer */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-indigo-500/30 rounded-full blur-2xl -z-10 pointer-events-none"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{
                                scale: [0.6, 1.5, 1.1],
                                opacity: [0, 0.7, 0.25],
                            }}
                            transition={{
                                duration: 2.8,
                                ease: "easeOut",
                                times: [0, 0.45, 1],
                                repeat: 1,          // play twice for emphasis
                                repeatDelay: 0.6,
                            }}
                        />
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
