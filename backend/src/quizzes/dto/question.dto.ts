import {
  IsEnum,
  IsString,
  IsArray,
  IsOptional,
  ValidateIf,
  ArrayNotEmpty,
} from 'class-validator';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ValidateIf((obj) => obj.type === QuestionType.CHECKBOX)
  @ArrayNotEmpty()
  options?: string[];

  @IsOptional()
  @IsString()
  @ValidateIf(
    (obj) =>
      obj.type === QuestionType.INPUT || obj.type === QuestionType.BOOLEAN,
  )
  correctAnswer?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ValidateIf((obj) => obj.type === QuestionType.CHECKBOX)
  @ArrayNotEmpty()
  correctAnswers?: string[];
}
