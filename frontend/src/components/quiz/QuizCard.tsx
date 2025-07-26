import { useState } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Trash2, Eye } from 'lucide-react';
import { QuizSummary } from '@/types/quiz';
import Button from '@/components/ui/Button';

interface QuizCardProps {
  quiz: QuizSummary;
  onDelete: (id: string) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete

    if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(quiz.id);
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
      <Link href={`/quizzes/${quiz.id}`} className='block'>
        <div className='p-6'>
          {/* Quiz Title */}
          <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
            {quiz.title}
          </h3>

          {/* Quiz Meta */}
          <div className='flex items-center space-x-4 text-sm text-gray-500 mb-4'>
            <div className='flex items-center'>
              <FileText className='w-4 h-4 mr-1' />
              {quiz.questionCount}{' '}
              {quiz.questionCount === 1 ? 'question' : 'questions'}
            </div>
            <div className='flex items-center'>
              <Calendar className='w-4 h-4 mr-1' />
              {formatDate(quiz.createdAt)}
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
            <div className='flex items-center text-blue-600 hover:text-blue-700 font-medium'>
              <Eye className='w-4 h-4 mr-1' />
              View Details
            </div>

            <Button
              variant='ghost'
              size='sm'
              onClick={handleDelete}
              loading={isDeleting}
              className='text-red-600 hover:text-red-700 hover:bg-red-50 p-2'
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
