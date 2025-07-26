import {
  IsString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './question.dto';


export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export class QuizSummaryDto {
  id: string;
  title: string;
  questionCount: number;
  createdAt: Date;
}
