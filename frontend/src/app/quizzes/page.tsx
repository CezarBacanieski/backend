'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Search } from 'lucide-react';
import { QuizSummary } from '@/types/quiz';
import { quizApi } from '@/services/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import QuizCard from '@/components/quiz/QuizCard';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    // Filter quizzes based on search term
    if (searchTerm.trim() === '') {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchTerm, quizzes]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await quizApi.getAllQuizzes();
      setQuizzes(data);
      setFilteredQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError('Failed to load quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizApi.deleteQuiz(quizId);
      // Remove from local state
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error; // Re-throw to let QuizCard handle the error display
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-64'>
        <div className='text-center'>
          <LoadingSpinner size='lg' className='mx-auto mb-4' />
          <p className='text-gray-600'>Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 mb-4'>{error}</p>
        <Button onClick={fetchQuizzes}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>All Quizzes</h1>
          <p className='text-gray-600'>
            {quizzes.length === 0
              ? 'No quizzes created yet.'
              : `Manage your ${quizzes.length} quiz${
                  quizzes.length === 1 ? '' : 'es'
                }.`}
          </p>
        </div>
        <Link href='/create' className='mt-4 sm:mt-0'>
          <Button>
            <PlusCircle className='w-4 h-4 mr-2' />
            Create Quiz
          </Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        // Empty State
        <div className='text-center py-12'>
          <div className='max-w-md mx-auto'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <PlusCircle className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No quizzes yet
            </h3>
            <p className='text-gray-600 mb-6'>
              Get started by creating your first quiz with custom questions.
            </p>
            <Link href='/create'>
              <Button>
                <PlusCircle className='w-4 h-4 mr-2' />
                Create Your First Quiz
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className='mb-6'>
            <div className='relative max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                type='text'
                placeholder='Search quizzes...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
          </div>

          {/* Results Count */}
          {searchTerm && (
            <div className='mb-4'>
              <p className='text-sm text-gray-600'>
                {filteredQuizzes.length === 0
                  ? 'No quizzes found'
                  : `${filteredQuizzes.length} quiz${
                      filteredQuizzes.length === 1 ? '' : 'es'
                    } found`}{' '}
                for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Quiz Grid */}
          {filteredQuizzes.length === 0 && searchTerm ? (
            <div className='text-center py-12'>
              <p className='text-gray-500'>No quizzes match your search.</p>
            </div>
          ) : (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={handleDeleteQuiz}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
