import { useState, useEffect } from 'react';
import {
  useFieldArray,
  Control,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Trash2, Plus, Move } from 'lucide-react';
import { QuestionType } from '@/types/quiz';
import { QuizFormData } from '@/schemas/quiz';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface QuestionFormProps {
  control: Control<QuizFormData>;
  questionIndex: number;
  onRemove: () => void;
  canRemove: boolean;
}

export default function QuestionForm({
  control,
  questionIndex,
  onRemove,
  canRemove,
}: QuestionFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuizFormData>();

  const questionType = watch(`questions.${questionIndex}.type` as const);
  const options = watch(`questions.${questionIndex}.options` as const) || [];

  // Initialize options array if it doesn't exist for checkbox questions
  useEffect(() => {
    if (
      questionType === QuestionType.CHECKBOX &&
      (!options || options.length === 0)
    ) {
      setValue(`questions.${questionIndex}.options` as const, ['', '']);
    }
  }, [questionType, questionIndex, setValue, options]);

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options` as any,
  });

  const addOption = () => {
    appendOption('');
  };

  const removeOptionAtIndex = (optionIndex: number) => {
    removeOption(optionIndex);

    const correctAnswers =
      watch(`questions.${questionIndex}.correctAnswers` as const) || [];
    const optionValue = options[optionIndex];
    if (correctAnswers.includes(optionValue)) {
      const newCorrectAnswers = correctAnswers.filter(
        (answer) => answer !== optionValue
      );
      setValue(
        `questions.${questionIndex}.correctAnswers` as const,
        newCorrectAnswers
      );
    }
  };

  const handleCorrectAnswerChange = (
    optionValue: string,
    isChecked: boolean
  ) => {
    const currentCorrectAnswers =
      watch(`questions.${questionIndex}.correctAnswers` as const) || [];

    if (isChecked) {
      if (!currentCorrectAnswers.includes(optionValue)) {
        setValue(`questions.${questionIndex}.correctAnswers` as const, [
          ...currentCorrectAnswers,
          optionValue,
        ]);
      }
    } else {
      const newCorrectAnswers = currentCorrectAnswers.filter(
        (answer) => answer !== optionValue
      );
      setValue(
        `questions.${questionIndex}.correctAnswers` as const,
        newCorrectAnswers
      );
    }
  };

  const questionError = errors.questions?.[questionIndex];

  // Helper function to get error message safely
  const getErrorMessage = (error: any): string | undefined => {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return error.message;
    }
    return undefined;
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      {/* Question Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <Move className='w-5 h-5 text-gray-400 mr-2' />
          <h3 className='text-lg font-medium text-gray-900'>
            Question {questionIndex + 1}
          </h3>
        </div>
        {canRemove && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onRemove}
            className='text-red-600 hover:text-red-700 hover:bg-red-50'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        )}
      </div>

      {/* Question Text */}
      <div className='mb-4'>
        <Input
          label='Question Text'
          placeholder='Enter your question...'
          {...register(`questions.${questionIndex}.text` as const)}
          error={getErrorMessage(questionError?.text)}
        />
      </div>

      {/* Question Type */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Question Type
        </label>
        <select
          {...register(`questions.${questionIndex}.type` as const)}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        >
          <option value={QuestionType.BOOLEAN}>True/False</option>
          <option value={QuestionType.INPUT}>Short Answer</option>
          <option value={QuestionType.CHECKBOX}>Multiple Choice</option>
        </select>
        {questionError?.type && (
          <p className='mt-1 text-sm text-red-600'>
            {getErrorMessage(questionError.type)}
          </p>
        )}
      </div>

      {/* Boolean Type Configuration */}
      {questionType === QuestionType.BOOLEAN && (
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Correct Answer
          </label>
          <div className='space-y-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                value='true'
                {...register(
                  `questions.${questionIndex}.correctAnswer` as const
                )}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
              />
              <span className='ml-2 text-sm text-gray-700'>True</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                value='false'
                {...register(
                  `questions.${questionIndex}.correctAnswer` as const
                )}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
              />
              <span className='ml-2 text-sm text-gray-700'>False</span>
            </label>
          </div>
          {questionError?.correctAnswer && (
            <p className='mt-1 text-sm text-red-600'>
              {getErrorMessage(questionError.correctAnswer)}
            </p>
          )}
        </div>
      )}

      {/* Input Type Configuration */}
      {questionType === QuestionType.INPUT && (
        <div className='mb-4'>
          <Input
            label='Correct Answer'
            placeholder='Enter the correct answer...'
            {...register(`questions.${questionIndex}.correctAnswer` as const)}
            error={getErrorMessage(questionError?.correctAnswer)}
          />
        </div>
      )}

      {/* Checkbox Type Configuration */}
      {questionType === QuestionType.CHECKBOX && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='block text-sm font-medium text-gray-700'>
              Answer Options
            </label>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={addOption}
              className='text-blue-600 hover:text-blue-700'
            >
              <Plus className='w-4 h-4 mr-1' />
              Add Option
            </Button>
          </div>

          {optionFields.map((field, optionIndex) => {
            const optionValue = watch(
              `questions.${questionIndex}.options.${optionIndex}` as const
            );
            const correctAnswers =
              watch(`questions.${questionIndex}.correctAnswers` as const) || [];
            const isCorrect = correctAnswers.includes(optionValue);

            return (
              <div key={field.id} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={isCorrect}
                  onChange={(e) =>
                    handleCorrectAnswerChange(optionValue, e.target.checked)
                  }
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <div className='flex-1'>
                  <Input
                    placeholder={`Option ${optionIndex + 1}`}
                    {...register(
                      `questions.${questionIndex}.options.${optionIndex}` as const
                    )}
                  />
                </div>
                {optionFields.length > 2 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeOptionAtIndex(optionIndex)}
                    className='text-red-600 hover:text-red-700'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                )}
              </div>
            );
          })}

          {questionError?.options && (
            <p className='text-sm text-red-600'>
              {getErrorMessage(questionError.options)}
            </p>
          )}
          {questionError?.correctAnswers && (
            <p className='text-sm text-red-600'>
              {getErrorMessage(questionError.correctAnswers)}
            </p>
          )}

          <p className='text-xs text-gray-500'>
            Check the boxes next to correct answers. You can select multiple
            correct answers.
          </p>
        </div>
      )}

      {/* General question error */}
      {questionError?.root && (
        <p className='mt-2 text-sm text-red-600'>
          {getErrorMessage(questionError.root)}
        </p>
      )}
    </div>
  );
}
