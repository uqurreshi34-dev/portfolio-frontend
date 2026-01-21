'use client';

import { motion } from 'framer-motion';

interface Tool {
    name: string;
    category: string;
    icon: string;
    color: string;
}

export default function Tools() {
    const tools: Tool[] = [
        {
            name: 'GitHub',
            category: 'Version Control',
            icon: '⚡',
            color: 'bg-gray-800'
        },
        {
            name: 'Vercel',
            category: 'Deployment',
            icon: '▲',
            color: 'bg-black'
        },
        {
            name: 'Render',
            category: 'Deployment',
            icon: '🚀',
            color: 'bg-purple-600'
        },
        {
            name: 'UptimeRobot',
            category: 'Monitoring',
            icon: '📊',
            color: 'bg-green-600'
        },
        {
            name: 'Next.js',
            category: 'Frontend',
            icon: 'N',
            color: 'bg-black'
        },
        {
            name: 'React',
            category: 'Frontend',
            icon: '⚛️',
            color: 'bg-blue-500'
        },
        {
            name: 'Python',
            category: 'Backend',
            icon: '🐍',
            color: 'bg-yellow-500'
        },
        {
            name: 'Django',
            category: 'Backend',
            icon: 'D',
            color: 'bg-green-700'
        },
        {
            name: 'PostgreSQL',
            category: 'Database',
            icon: '🐘',
            color: 'bg-blue-700'
        },
        {
            name: 'Neon',
            category: 'Database',
            icon: '⚡',
            color: 'bg-gradient-to-r from-purple-500 to-pink-500'
        }
    ];

    return (
        <section id="tools" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Tools & Technologies</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Technologies and platforms I use to build amazing projects
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group"
                        >
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center">
                                <div className={`${tool.color} w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition`}>
                                    {tool.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
