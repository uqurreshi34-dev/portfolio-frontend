'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/types';

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                setPosts(data.slice(0, 6)); // Show only latest 6 posts
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading blog posts...</div>;
    }

    if (posts.length === 0) {
        return null; // Don't show section if no posts
    }

    return (
        <section id="blog" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Thoughts on web development, programming, and technology
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {posts.map((post) => (
                        <motion.article
                            key={post.id}
                            // ... animation props ...
                            className="w-full max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
                        >
                            {post.featured_image && (
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        placeholder="blur"
                                        // light blue blur for blog posts
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {post.reading_time} min
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {post.views}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {posts.length >= 6 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/blog"
                            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            View All Posts
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
