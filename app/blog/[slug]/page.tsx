'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { getBlogPost, submitComment } from '@/lib/api';
import { BlogPost, CommentForm } from '@/types';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [commentForm, setCommentForm] = useState<Omit<CommentForm, 'post'>>({
        name: '',
        email: '',
        comment: '',
    });
    const [commentStatus, setCommentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getBlogPost(slug);
                setPost(data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        setCommentStatus('loading');
        try {
            await submitComment({
                post: post.id,
                ...commentForm,
            });
            setCommentStatus('success');
            setCommentForm({ name: '', email: '', comment: '' });
        } catch (error) {
            console.error('Error submitting comment:', error);
            setCommentStatus('error');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                {post.featured_image && (
                    <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority // Load immediately since it's the hero image
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
                        />
                    </div>
                )}

                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                        {post.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                            <Calendar size={18} />
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={18} />
                            {post.reading_time} min read
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye size={18} />
                            {post.views} views
                        </span>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{post.excerpt}</p>
                    <div className="whitespace-pre-wrap">{post.content}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-12">
                    {post.tags.split(',').map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                            #{tag.trim()}
                        </span>
                    ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                    <h2 className="text-2xl font-bold mb-6">Comments ({post.comments?.length || 0})</h2>

                    {post.comments && post.comments.length > 0 && (
                        <div className="space-y-6 mb-12">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold">{comment.name}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
                        <form onSubmit={handleCommentSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 font-medium">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={commentForm.name}
                                        onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={commentForm.email}
                                        onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Comment</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={commentForm.comment}
                                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={commentStatus === 'loading'}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {commentStatus === 'loading' ? 'Submitting...' : 'Post Comment'}
                            </button>
                            {commentStatus === 'success' && (
                                <p className="text-green-600">Comment submitted! It will appear after approval.</p>
                            )}
                            {commentStatus === 'error' && (
                                <p className="text-red-600">Failed to submit comment. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </article>
    );
}
