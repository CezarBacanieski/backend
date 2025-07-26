import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, QuizSummaryDto } from './dto/quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createQuizDto: CreateQuizDto,
  ): Promise<Quiz> {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  async findAll(): Promise<QuizSummaryDto[]> {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizzesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.quizzesService.remove(id);
  }
}
