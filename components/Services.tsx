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

    // Fixed: Properly typed icon map
    // This is an object that works as a dictionary / lookup table 
    // where keys are strings and values are of type LucideIcon
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
        return <Icon size={40} />;
    };

    if (loading) {
        return <div className="text-center py-20">Loading services...</div>;
    }

    if (services.length === 0) {
        return null;
    }

    return (
        <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Services I Offer</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Professional development services tailored to your needs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition ${service.featured ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            {service.featured && (
                                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-4">
                                    POPULAR
                                </span>
                            )}

                            <div className="text-blue-600 dark:text-blue-400 mb-4">
                                {getIcon(service.icon)}
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {service.description}
                            </p>

                            {service.price_range && (
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    {service.price_range}
                                </p>
                            )}

                            {service.delivery_time && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                                    ⏱️ {service.delivery_time}
                                </p>
                            )}

                            <ul className="space-y-2 mb-6">
                                {service.features_list.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Fixed button/link */}
                            <a
                                href="#contact"
                                className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Get Started
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
