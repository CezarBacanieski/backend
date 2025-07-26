import { z } from 'zod';
import { QuestionType } from '@/types/quiz';

export const questionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.nativeEnum(QuestionType),
    options: z.array(z.string()).optional(),
    correctAnswer: z.string().optional(),
    correctAnswers: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      // Validation based on question type
      switch (data.type) {
        case QuestionType.BOOLEAN:
          return (
            data.correctAnswer &&
            ['true', 'false'].includes(data.correctAnswer.toLowerCase())
          );
        case QuestionType.INPUT:
          return data.correctAnswer && data.correctAnswer.trim() !== '';
        case QuestionType.CHECKBOX:
          return (
            data.options &&
            data.options.length >= 2 &&
            data.correctAnswers &&
            data.correctAnswers.length > 0 &&
            data.correctAnswers.every((answer) =>
              data.options?.includes(answer)
            )
          );
        default:
          return false;
      }
    },
    {
      message: 'Invalid question configuration for the selected type',
    }
  );

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required'),
});

export type QuizFormData = z.infer<typeof quizSchema>;
