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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            // ────────────────────────────────────────────────
                            //   Most important lines are these three ↓↓↓
                            className={`
        mx-auto
        w-full max-w-[380px]           ← adjust this value if you want cards wider/narrower
        bg-white dark:bg-gray-800
        rounded-xl p-6 md:p-8
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        border border-gray-100 dark:border-gray-700
        ${service.featured ? 'ring-2 ring-blue-500/50 shadow-blue-200/30 dark:shadow-blue-900/20' : ''}
      `}
                        // ────────────────────────────────────────────────
                        >
                            {/* POPULAR badge */}
                            {service.featured && (
                                <span className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                                    POPULAR
                                </span>
                            )}

                            <div className="flex justify-center mb-6 text-blue-600 dark:text-blue-400">
                                {getIcon(service.icon)}
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-5 text-center text-sm md:text-base">
                                {service.description}
                            </p>

                            {service.price_range && (
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3 text-center">
                                    {service.price_range}
                                </p>
                            )}

                            {service.delivery_time && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
                                    ⏱️ {service.delivery_time}
                                </p>
                            )}

                            {/* Features – left aligned is usually better for readability */}
                            <ul className="space-y-2.5 mb-8 text-left text-sm md:text-base">
                                {service.features_list.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <span className="text-green-500 mt-0.5 text-lg shrink-0">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className="block w-full text-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                            >
                                Get Started
                            </a>
                        </motion.div>
                    ))}
                </div>            </div>
        </section>
    );
}
