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
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Services I Offer
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Professional development services tailored to your needs
                    </p>
                </div>

                {/* 1. Update the parent container to define the 7 rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 auto-rows-auto"
                    style={{ gridTemplateRows: 'repeat(7, auto)' }}>

                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }} // Starts slightly lower (30px) and invisible
                            whileInView={{ opacity: 1, y: 0 }} // Fades in and moves up to its spot
                            viewport={{ once: true, margin: "-50px" }} // Trigger animation slightly before it enters the screen
                            transition={{
                                duration: 0.8,
                                delay: index * 0.3, // This "staggers" them: Card 1 (0s), Card 2 (0.2s), Card 3 (0.4s)
                                ease: "easeOut"
                            }}
                            className={`
                            bg-white dark:bg-gray-800
                            rounded-xl p-6 md:p-8
                            shadow-lg hover:shadow-2xl
                            transition-all duration-300
                            border border-gray-100 dark:border-gray-700
                            relative
                            ${service.featured ? 'ring-2 ring-blue-500/50 shadow-blue-200/30' : ''}
                        `}
                            style={{
                                display: 'grid',
                                gridRow: 'span 7',
                                gridTemplateRows: 'subgrid',
                                gap: '1rem'
                            }}
                        >
                            {/* 1. THE BADGE: Absolute positioned, doesn't affect grid rows */}
                            {service.featured && (
                                <motion.span
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md z-10 cursor-default"
                                >
                                    POPULAR
                                </motion.span>
                            )}

                            {/* Row 1: Icon */}
                            <div className="flex justify-center text-blue-600 dark:text-blue-400">
                                {getIcon(service.icon)}
                            </div>

                            {/* Row 2: Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-center">
                                {service.title}
                            </h3>

                            {/* Row 3: Description */}
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm md:text-base leading-relaxed">
                                {service.description}
                            </p>

                            {/* Row 4: Price */}
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
                                {service.price_range || '\u00A0'}
                            </div>

                            {/* Row 5: Delivery Time */}
                            <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center">
                                {service.delivery_time ? `⏱️ ${service.delivery_time}` : '\u00A0'}
                            </div>

                            {/* Row 6: Features */}
                            <div className="min-h-[100px]"> {/* Ensures a baseline for the list */}
                                {service.features_list?.length > 0 && (
                                    <ul className="space-y-2 text-left text-sm md:text-base">
                                        {service.features_list.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="text-green-500 text-lg shrink-0 mt-0.5">✓</span>
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Row 7: THE BUTTON: Now with motion properties */}
                            <motion.a
                                href="#contact"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "#1d4ed8", // darkens to blue-700
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="block w-full text-center px-6 py-3.5 bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                Get Started
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
