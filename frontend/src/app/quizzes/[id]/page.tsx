'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Hash } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { quizApi } from '@/services/api';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import QuestionDisplay from '@/components/quiz/QuestionDisplay';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quizId = params.id as string;

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await quizApi.getQuizById(quizId);
      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/quizzes');
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-64'>
        <div className='text-center'>
          <LoadingSpinner size='lg' className='mx-auto mb-4' />
          <p className='text-gray-600'>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 mb-4'>{error}</p>
        <div className='space-x-4'>
          <Button onClick={fetchQuiz}>Try Again</Button>
          <Button variant='secondary' onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 mb-4'>Quiz not found.</p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <Button
          variant='secondary'
          onClick={handleGoBack}
          className='mb-6 inline-flex items-center'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Quizzes
        </Button>

        <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            {quiz.title}
          </h1>

          {/* Quiz Meta Information */}
          <div className='flex flex-wrap items-center gap-6 text-sm text-gray-600'>
            <div className='flex items-center'>
              <Hash className='w-4 h-4 mr-2' />
              <span>
                {quiz.questions.length} question
                {quiz.questions.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className='flex items-center'>
              <Calendar className='w-4 h-4 mr-2' />
              <span>
                Created {new Date(quiz.createdAt).toLocaleDateString()}
              </span>
            </div>
            {quiz.updatedAt !== quiz.createdAt && (
              <div className='flex items-center'>
                <Clock className='w-4 h-4 mr-2' />
                <span>
                  Updated {new Date(quiz.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Questions</h2>

        {quiz.questions && quiz.questions.length > 0 ? (
          quiz.questions.map((question, index) => (
            <QuestionDisplay
              key={question.id}
              question={question}
              questionNumber={index + 1}
            />
          ))
        ) : (
          <div className='text-center py-8 text-gray-500'>
            No questions found in this quiz.
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className='mt-8 pt-6 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
          <Button variant='secondary' onClick={handleGoBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Quizzes
          </Button>

          <div className='text-sm text-gray-600'>Quiz ID: {quiz.id}</div>
        </div>
      </div>
    </div>
  );
}
