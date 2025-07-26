import Link from 'next/link';
import { PlusCircle, List, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className='max-w-4xl mx-auto'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Welcome to Quiz Builder
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Create engaging quizzes with multiple question types and share them
          with others.
        </p>
        <div className='flex justify-center space-x-4'>
          <Link href='/create'>
            <Button size='lg' className='px-8'>
              <PlusCircle className='w-5 h-5 mr-2' />
              Create Your First Quiz
            </Button>
          </Link>
          <Link href='/quizzes'>
            <Button variant='secondary' size='lg' className='px-8'>
              <List className='w-5 h-5 mr-2' />
              Browse Quizzes
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className='grid md:grid-cols-3 gap-8 mb-12'>
        <div className='text-center p-6 bg-white rounded-lg shadow-sm border'>
          <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
            <CheckCircle className='w-6 h-6 text-blue-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            Multiple Question Types
          </h3>
          <p className='text-gray-600'>
            Support for Boolean (True/False), Input (Short Answer), and Checkbox
            (Multiple Choice) questions.
          </p>
        </div>

        <div className='text-center p-6 bg-white rounded-lg shadow-sm border'>
          <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
            <PlusCircle className='w-6 h-6 text-green-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            Easy Creation
          </h3>
          <p className='text-gray-600'>
            Intuitive interface to add, remove, and configure questions
            dynamically as you build your quiz.
          </p>
        </div>

        <div className='text-center p-6 bg-white rounded-lg shadow-sm border'>
          <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
            <List className='w-6 h-6 text-purple-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            Manage & Share
          </h3>
          <p className='text-gray-600'>
            View all your quizzes in one place, see detailed structures, and
            manage your quiz collection.
          </p>
        </div>
      </div>

      {/* Getting Started */}
      <div className='bg-white rounded-lg shadow-sm border p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Getting Started
        </h2>
        <div className='space-y-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4'>
              1
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Create a Quiz</h3>
              <p className='text-gray-600'>
                Click "Create Your First Quiz" to start building a new quiz with
                your custom questions.
              </p>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4'>
              2
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Add Questions</h3>
              <p className='text-gray-600'>
                Add different types of questions: True/False, Short Answer, or
                Multiple Choice with checkboxes.
              </p>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4'>
              3
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>Save & Share</h3>
              <p className='text-gray-600'>
                Save your quiz and view it in the quiz list. You can always come
                back to see the structure or delete it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
