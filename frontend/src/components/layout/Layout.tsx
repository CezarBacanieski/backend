import { ReactNode } from 'react';
import Link from 'next/link';

import { PlusCircle, List, Home } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Link href='/' className='text-xl font-bold text-gray-900'>
                Quiz Builder
              </Link>
            </div>
            <nav className='flex space-x-4'>
              <Link
                href='/'
                className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
              >
                <Home className='w-4 h-4 mr-2' />
                Home
              </Link>
              <Link
                href='/quizzes'
                className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
              >
                <List className='w-4 h-4 mr-2' />
                All Quizzes
              </Link>
              <Link
                href='/create'
                className='flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
              >
                <PlusCircle className='w-4 h-4 mr-2' />
                Create Quiz
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  );
}
