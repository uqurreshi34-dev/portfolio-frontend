// components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 md:py-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Shuaib & Ashar
                    </h1>

                    <motion.p
                        className="relative text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-8 md:mb-10 tracking-wide drop-shadow-[0_0_12px_rgba(99,102,241,0.6)] dark:drop-shadow-[0_0_16px_rgba(139,92,246,0.7)]"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                    >
                        {/* Text with permanent glow */}
                        Full Stack Developers & Creative Problem Solvers

                        {/* Animated color-shifting background glow */}
                        <motion.span
                            className="absolute inset-0 rounded-full blur-3xl -z-10 pointer-events-none sm:blur-3xl md:blur-4xl"
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{
                                scale: [0.4, 2.2, 1.2],
                                opacity: [0, 0.95, 0.4],
                                background: [
                                    "linear-gradient(to right, #3b82f6 60%, #6366f1 50%, #8b5cf6 40%)",
                                    "linear-gradient(to right, #6366f1 60%, #8b5cf6 50%, #a78bfa 40%)",
                                    "linear-gradient(to right, #8b5cf6 60%, #a78bfa 50%, #c084fc 40%)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeOut",
                                times: [0, 0.5, 1],
                                repeat: 2,
                                repeatDelay: 0.8,
                                background: { duration: 4, repeat: 2, repeatType: "reverse" },
                            }}
                        />
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-base sm:text-lg font-medium w-full sm:w-auto"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition text-base sm:text-lg font-medium w-full sm:w-auto"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
