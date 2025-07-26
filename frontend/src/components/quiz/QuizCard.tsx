import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Eye, Calendar, FileText } from 'lucide-react';
import { QuizSummary } from '@/types/quiz';
import Button from '@/components/ui/Button';

interface QuizCardProps {
  quiz: QuizSummary;
  onDelete: (quizId: string) => Promise<void>;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this quiz? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      await onDelete(quiz.id);
    } catch (error) {
      console.error('Error deleting quiz:', error);
      setError('Failed to delete quiz. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
      {/* Quiz Title */}
      <h3 className='text-lg font-semibold text-gray-900 mb-3 line-clamp-2'>
        {quiz.title}
      </h3>

      {/* Quiz Meta */}
      <div className='flex items-center gap-4 text-sm text-gray-600 mb-4'>
        <div className='flex items-center'>
          <FileText className='w-4 h-4 mr-1' />
          <span>{quiz.questionCount || 0} questions</span>
        </div>
        <div className='flex items-center'>
          <Calendar className='w-4 h-4 mr-1' />
          <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <Link href={`/quizzes/${quiz.id}`}>
          <Button variant='secondary' size='sm'>
            <Eye className='w-4 h-4 mr-2' />
            View Details
          </Button>
        </Link>

        <Button
          variant='danger'
          size='sm'
          onClick={handleDelete}
          disabled={isDeleting}
          className='text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'
        >
          <Trash2 className='w-4 h-4 mr-2' />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
}
