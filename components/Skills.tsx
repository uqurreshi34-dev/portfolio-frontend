'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '@/lib/api';
import { Skill } from '@/types';
import { SkeletonSkillsCard } from '@/components/SkeletonLoader';

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <SkeletonSkillsCard />
                        <SkeletonSkillsCard />
                        <SkeletonSkillsCard />
                    </div>
                </div>
            </section>
        );
    }

    // Group skills by category
    const groupedSkills = skills.reduce((accumulator, currentSkill) => {
        // If we don't have this category yet in our result object
        if (!accumulator[currentSkill.category]) {
            // Create an empty array for this category
            accumulator[currentSkill.category] = [];
        }

        // Push the current skill into the right category's array
        accumulator[currentSkill.category].push(currentSkill);

        // Very important: always return the accumulator!
        return accumulator;
    }, {} as Record<string, Skill[]>);   // ← starting value: empty object {}

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-blue-600">{category}</h3>
                            <div className="space-y-4">
                                {categorySkills.map((skill) => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.proficiency}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="bg-linear-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
