import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <div className='text-6xl font-bold text-indigo-600 mb-4'>404</div>
          <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
            Page Not Found
          </h1>
          <p className='text-gray-600 mb-8'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <Link
          href='/'
          className='inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full'
        >
          <Home className='w-4 h-4' />
          Go to Home
        </Link>

        <div className='mt-8 text-sm text-gray-500'>
          <p>Lost? Try creating a new quiz or browse existing ones!</p>
        </div>
      </div>
    </div>
  );
}
