import axios from 'axios';
import { Project, Skill, ContactForm } from '@/types'

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
