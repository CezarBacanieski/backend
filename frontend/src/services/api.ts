import axios from 'axios';
import { Quiz, QuizSummary, CreateQuizDto } from '@/types/quiz';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizApi = {
  createQuiz: async (data: CreateQuizDto): Promise<Quiz> => {
    const response = await api.post<Quiz>('/quizzes', data);
    return response.data;
  },

  getAllQuizzes: async (): Promise<QuizSummary[]> => {
    const response = await api.get<QuizSummary[]>('/quizzes');
    return response.data;
  },

  getQuizById: async (id: string): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`);
  },
};

export default api;
