'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react';
import { getSocialPosts } from '@/lib/api';
import { SocialPost } from '@/types';
import { SkeletonSocialCard } from '@/components/SkeletonLoader';
import Image from 'next/image';

export default function SocialFeed() {
    const [posts, setPosts] = useState<SocialPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getSocialPosts(undefined, 6); // Limit to 6 posts
                setPosts(data);
            } catch (error) {
                console.error('Error fetching social posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const getPlatformColor = (platform: string): string => {
        const colors: Record<string, string> = {
            twitter: 'bg-blue-400',
            x: 'bg-black', // optional - if you want to support 𝕏 separately
            github: 'bg-gray-800',
            linkedin: 'bg-blue-700',
            medium: 'bg-black',
            dev: 'bg-purple-600',
        };
        return colors[platform.toLowerCase()] || 'bg-gray-600';
    };

    const getPlatformIcon = (platform: string): string => {
        const icons: Record<string, string> = {
            twitter: '𝕏',
            x: '𝕏',
            github: '🐙',
            linkedin: 'in',
            medium: 'M',
            dev: 'DEV',
        };
        return icons[platform.toLowerCase()] || '•';
    };

    if (loading) {
        return (
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Recent Activity</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            What I&apos;ve been sharing across the web
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SkeletonSocialCard />
                        <SkeletonSocialCard />
                        <SkeletonSocialCard />
                        <SkeletonSocialCard />
                        <SkeletonSocialCard />
                        <SkeletonSocialCard />
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <section id="social" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Recent Activity</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        What I&apos;ve been sharing across the web
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            // ... animation props ...
                            className="w-full max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className={`${getPlatformColor(post.platform)} text-white px-3 py-1 rounded-full text-xs font-bold`}
                                >
                                    {getPlatformIcon(post.platform)} {post.platform_display}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-500">
                                    {new Date(post.posted_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>

                            <div className="grow">
                                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                                    {post.content}
                                </p>

                                {post.image_url && (
                                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                                        <Image
                                            src={post.image_url}
                                            alt="Post image"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            // Optional: nice loading effect
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC" // very light gray or real low-res blur
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-5">
                                    <span className="flex items-center gap-1">
                                        <Heart size={16} />
                                        {post.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={16} />
                                        {post.comments}
                                    </span>
                                    {post.shares > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Share2 size={16} />
                                            {post.shares}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <a
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mt-auto"
                            >
                                View Post
                                <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
