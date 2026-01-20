// components/Projects.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getProjects } from '@/lib/api';
import { Project } from '@/types';
import { SkeletonProjectCard } from '@/components/SkeletonLoader';
import Image from 'next/image';

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SkeletonProjectCard />
                        <SkeletonProjectCard />
                        <SkeletonProjectCard />
                        <SkeletonProjectCard />
                        <SkeletonProjectCard />
                        <SkeletonProjectCard />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }} // optional: animate only once
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition w-full sm:w-80 md:w-96"
                            whileHover={{ scale: 1.05, y: -5 }} // optional nice hover lift (add if you want subtle scale)
                        >
                            {project.image && (
                                <div className="relative w-full h-48 overflow-hidden"> {/* ← Critical wrapper! */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105" // smooth zoom on hover
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // better perf/responsiveness
                                        priority={index < 3} // load first few faster
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {project.description}
                                </p>
                                <p className="text-sm text-blue-600 mb-4">{project.technologies}</p>
                                <div className="flex gap-4">
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Code
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                                            <ExternalLink size={20} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
