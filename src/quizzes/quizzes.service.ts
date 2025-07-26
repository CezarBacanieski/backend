import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto, QuizSummaryDto } from './dto/quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { QuestionType } from './dto/question.dto';
import { QuestionType as PrismaQuestionType } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      // Validate questions based on their types
      this.validateQuestions(createQuizDto.questions);

      const quiz = await this.prisma.quiz.create({
        data: {
          title: createQuizDto.title,
          questions: {
            create: createQuizDto.questions.map((question) => ({
              text: question.text,
              type: question.type as PrismaQuestionType,
              options: question.options || [],
              correctAnswer: question.correctAnswer || null,
              correctAnswers: question.correctAnswers || [],
            })),
          },
        },
        include: {
          questions: true,
        },
      });

      // Transform the result to match our entity interface
      return {
        ...quiz,
        questions: quiz.questions.map((question) => ({
          ...question,
          type: question.type as QuestionType,
        })),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create quiz');
    }
  }

  async findAll(): Promise<QuizSummaryDto[]> {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    // Transform the result to match our entity interface
    return {
      ...quiz,
      questions: quiz.questions.map((question) => ({
        ...question,
        type: question.type as QuestionType,
      })),
    };
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    await this.prisma.quiz.delete({
      where: { id },
    });
  }

  private validateQuestions(questions: any[]): void {
    for (const question of questions) {
      switch (question.type) {
        case QuestionType.BOOLEAN:
          if (
            !question.correctAnswer ||
            !['true', 'false'].includes(question.correctAnswer.toLowerCase())
          ) {
            throw new BadRequestException(
              'Boolean questions must have correctAnswer as "true" or "false"',
            );
          }
          break;

        case QuestionType.INPUT:
          if (!question.correctAnswer || question.correctAnswer.trim() === '') {
            throw new BadRequestException(
              'Input questions must have a correctAnswer',
            );
          }
          break;

        case QuestionType.CHECKBOX:
          if (!question.options || question.options.length < 2) {
            throw new BadRequestException(
              'Checkbox questions must have at least 2 options',
            );
          }
          if (
            !question.correctAnswers ||
            question.correctAnswers.length === 0
          ) {
            throw new BadRequestException(
              'Checkbox questions must have at least one correct answer',
            );
          }
          // Validate that all correct answers are in options
          const invalidAnswers = question.correctAnswers.filter(
            (answer: string) => !question.options.includes(answer),
          );
          if (invalidAnswers.length > 0) {
            throw new BadRequestException(
              'All correct answers must be present in options',
            );
          }
          break;

        default:
          throw new BadRequestException(
            `Invalid question type: ${question.type}`,
          );
      }
    }
  }
}
