export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string | null;
  correctAnswers: string[];
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  createdAt: Date;
}

export interface CreateQuestionDto {
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}