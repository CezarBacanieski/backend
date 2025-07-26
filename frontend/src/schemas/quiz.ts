import { z } from 'zod';
import { QuestionType } from '@/types/quiz';

export const questionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.nativeEnum(QuestionType),
    options: z.array(z.string()).default([]).optional(),
    correctAnswer: z.string().optional(),
    correctAnswers: z.array(z.string()).default([]).optional(),
  })
  .superRefine((data, ctx) => {
    // Validation based on question type
    switch (data.type) {
      case QuestionType.BOOLEAN:
        if (
          !data.correctAnswer ||
          !['true', 'false'].includes(data.correctAnswer.toLowerCase())
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'Boolean questions must have correctAnswer as "true" or "false"',
            path: ['correctAnswer'],
          });
        }
        break;

      case QuestionType.INPUT:
        if (!data.correctAnswer || data.correctAnswer.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Input questions must have a correct answer',
            path: ['correctAnswer'],
          });
        }
        break;

      case QuestionType.CHECKBOX:
        if (!data.options || data.options.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Checkbox questions must have at least 2 options',
            path: ['options'],
          });
        }
        if (!data.correctAnswers || data.correctAnswers.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Checkbox questions must have at least one correct answer',
            path: ['correctAnswers'],
          });
        }
        // Validate that all correct answers are in options
        if (data.options && data.correctAnswers) {
          const invalidAnswers = data.correctAnswers.filter(
            (answer: string) => !data.options?.includes(answer)
          );
          if (invalidAnswers.length > 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'All correct answers must be present in options',
              path: ['correctAnswers'],
            });
          }
        }
        break;
    }
  });

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required'),
});

export type QuizFormData = z.infer<typeof quizSchema>;
