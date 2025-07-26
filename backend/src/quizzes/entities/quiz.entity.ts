import { QuestionType } from '../dto/question.dto';

export interface Quiz {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
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
