'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Palette, Database, Smartphone, Globe, LucideIcon } from 'lucide-react';
import { getServices } from '@/lib/api';
import { Service } from '@/types';

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const iconMap: Record<string, LucideIcon> = {
        Code,
        Server,
        Palette,
        Database,
        Smartphone,
        Globe,
    };

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName] || Code;
        return <Icon size={40} strokeWidth={1.8} />;
    };

    if (loading) {
        return <div className="text-center py-20 text-lg">Loading services...</div>;
    }

    if (services.length === 0) {
        return null;
    }

    return (
        <section id="services" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
                {/* Heading - already centered */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Services I Offer
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Professional development services tailored to your needs
                    </p>
                </div>

                {/* Cards grid - this is the critical part */}
                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`
                          w-full max-w-md
                          bg-white dark:bg-gray-800
                          rounded-xl p-6 md:p-8
                          shadow-lg hover:shadow-2xl
                          transition-all duration-300
                          border border-gray-100 dark:border-gray-700
                          relative
                          flex flex-col
                          ${service.featured ? 'ring-2 ring-blue-500/50 shadow-blue-200/30' : ''}
                        `}
                        >
                            {/* ── TOP SECTION ── now with controlled height ── */}
                            <div className="flex flex-col items-center min-h-[220px] md:min-h-[260px] mb-6">
                                <div className="flex justify-center mb-6 text-blue-600 dark:text-blue-400">
                                    {getIcon(service.icon)}
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold mb-3 text-center min-h-12 flex items-center justify-center">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-center text-sm md:text-base grow flex items-start">
                                    {service.description}
                                </p>
                            </div>

                            {/* ── BOTTOM ALIGNED SECTION ── now starts at same height everywhere ── */}
                            <div className="mt-auto flex flex-col items-center">
                                {/* Price & Delivery – guaranteed same vertical start point */}
                                <div className="text-center mb-6 w-full">
                                    {service.price_range && (
                                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                                            {service.price_range}
                                        </p>
                                    )}

                                    {service.delivery_time && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            ⏱️ {service.delivery_time}
                                        </p>
                                    )}
                                </div>

                                {/* Features list */}
                                {service.features_list?.length > 0 && (
                                    <div className="w-full mb-8">
                                        <ul className="space-y-2.5 text-left text-sm md:text-base">
                                            {service.features_list.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <span className="text-green-500 mt-0.5 text-lg shrink-0">✓</span>
                                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Button – always at very bottom */}
                                <a
                                    href="#contact"
                                    className="block w-full text-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                                >
                                    Get Started
                                </a>
                            </div>

                            {/* POPULAR badge */}
                            {service.featured && (
                                <span className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                                    POPULAR
                                </span>
                            )}
                        </motion.div>))}
                </div>
            </div>
        </section>
    );
}
