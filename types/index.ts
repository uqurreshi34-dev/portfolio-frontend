export interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    github_url: string | null;
    live_url: string | null;
    technologies: string;
    created_at: string;
    updated_at: string;
    featured: boolean;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    icon: string;
}

export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    author: string;
    excerpt: string;
    content?: string;
    featured_image: string | null;
    category: string;
    tags: string;
    views: number;
    reading_time: number;
    created_at: string;
    updated_at: string;
    featured: boolean;
    comments_count?: number;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    post: number;
    name: string;
    email: string;
    comment: string;
    created_at: string;
}

export interface CommentForm {
    post: number;
    name: string;
    email: string;
    comment: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    price_range: string;
    delivery_time: string;
    features: string;
    features_list: string[];
    featured: boolean;
    order: number;
}

export interface SocialPost {
    id: number;
    platform: string;
    platform_display: string;
    content: string;
    url: string;
    posted_at: string;
    likes: number;
    comments: number;
    shares: number;
    image_url: string;
    fetched_at: string;
}
