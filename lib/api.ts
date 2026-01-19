import axios from 'axios';
import { Project, Skill, ContactForm, BlogPost, Service, SocialPost, CommentForm } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get('/projects/');
    return response.data;
}

export const getProject = async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
}

export const getSkills = async (): Promise<Skill[]> => {
    const response = await api.get('/skills/');
    return response.data;
}

export const submitContact = async (data: ContactForm) => {
    const response = await api.post('/contact/', data);
    return response.data;
};


// Blog APIs
export const getBlogPosts = async (category?: string, featured?: boolean): Promise<BlogPost[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured) params.append('featured', 'true');

    const response = await api.get(`/blog/?${params.toString()}`);
    return response.data;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/${slug}/`);
    return response.data;
};

export const getBlogCategories = async (): Promise<string[]> => {
    const response = await api.get('/blog/categories/');
    return response.data;
};

export const submitComment = async (data: CommentForm) => {
    const response = await api.post('/comments/', data);
    return response.data;
};

// Service APIs
export const getServices = async (): Promise<Service[]> => {
    const response = await api.get('/services/');
    return response.data;
};

// Social Media APIs
export const getSocialPosts = async (platform?: string, limit?: number): Promise<SocialPost[]> => {
    const params = new URLSearchParams();
    if (platform) params.append('platform', platform);
    if (limit) params.append('limit', limit.toString());

    const response = await api.get(`/social/?${params.toString()}`);
    return response.data;
};
