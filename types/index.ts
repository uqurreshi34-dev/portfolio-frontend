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
