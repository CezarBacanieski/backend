'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Save } from 'lucide-react';
import { QuestionType } from '@/types/quiz';
import { quizSchema, QuizFormData } from '@/schemas/quiz';
import { quizApi } from '@/services/api';
import { getFieldErrorMessage } from '@/utils/form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import QuestionForm from '@/components/quiz/QuestionForm';

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          text: '',
          type: QuestionType.BOOLEAN,
          correctAnswer: '',
          options: [],
          correctAnswers: [],
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    append({
      text: '',
      type: QuestionType.BOOLEAN,
      correctAnswer: '',
      options: [],
      correctAnswers: [],
    });
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true);
    try {
      const transformedData = {
        title: data.title,
        questions: data.questions.map((question) => ({
          text: question.text,
          type: question.type,
          ...(question.type === QuestionType.CHECKBOX && {
            options: question.options || [],
            correctAnswers: question.correctAnswers || [],
          }),
          ...(question.type !== QuestionType.CHECKBOX && {
            correctAnswer: question.correctAnswer || '',
          }),
        })),
      };

      const createdQuiz = await quizApi.createQuiz(transformedData);
      router.push(`/quizzes/${createdQuiz.id}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Create New Quiz
        </h1>
        <p className='text-gray-600'>
          Build your custom quiz with different types of questions. Add, remove,
          and configure questions as needed.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Quiz Title */}
          <div className='bg-white p-6 border border-gray-200 rounded-lg shadow-sm'>
            <Input
              label='Quiz Title'
              placeholder='Enter a title for your quiz...'
              {...register('title')}
              error={getFieldErrorMessage(errors.title)}
            />
          </div>

          {/* Questions */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-900'>
                Questions ({fields.length})
              </h2>
              <Button type='button' variant='secondary' onClick={addQuestion}>
                <Plus className='w-4 h-4 mr-2' />
                Add Question
              </Button>
            </div>

            {fields.map((field, index) => (
              <QuestionForm
                key={field.id}
                control={control}
                questionIndex={index}
                onRemove={() => removeQuestion(index)}
                canRemove={fields.length > 1}
              />
            ))}

            {errors.questions?.root && (
              <p className='text-sm text-red-600'>
                {getFieldErrorMessage(errors.questions.root)}
              </p>
            )}
          </div>

          {/* Submit Actions */}
          <div className='flex justify-end space-x-4 pt-6 border-t'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type='submit' loading={isSubmitting} className='px-8'>
              <Save className='w-4 h-4 mr-2' />
              Create Quiz
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
