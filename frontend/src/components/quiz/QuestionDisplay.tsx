import { CheckCircle, Circle, Square, CheckSquare } from 'lucide-react';
import { Question, QuestionType } from '@/types/quiz';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
}

export default function QuestionDisplay({
  question,
  questionNumber,
}: QuestionDisplayProps) {
  const renderQuestionContent = () => {
    switch (question.type) {
      case QuestionType.BOOLEAN:
        return (
          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              {question.correctAnswer === 'true' ? (
                <CheckCircle className='w-5 h-5 text-green-600' />
              ) : (
                <Circle className='w-5 h-5 text-gray-400' />
              )}
              <span
                className={`text-sm ${
                  question.correctAnswer === 'true'
                    ? 'text-green-700 font-medium'
                    : 'text-gray-600'
                }`}
              >
                True
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              {question.correctAnswer === 'false' ? (
                <CheckCircle className='w-5 h-5 text-green-600' />
              ) : (
                <Circle className='w-5 h-5 text-gray-400' />
              )}
              <span
                className={`text-sm ${
                  question.correctAnswer === 'false'
                    ? 'text-green-700 font-medium'
                    : 'text-gray-600'
                }`}
              >
                False
              </span>
            </div>
            <div className='mt-3 p-3 bg-green-50 rounded-lg border border-green-200'>
              <p className='text-sm text-green-800'>
                <strong>Correct Answer:</strong>{' '}
                {question.correctAnswer === 'true' ? 'True' : 'False'}
              </p>
            </div>
          </div>
        );

      case QuestionType.INPUT:
        return (
          <div className='space-y-3'>
            <div className='p-3 bg-gray-50 rounded-lg border border-gray-200'>
              <p className='text-sm text-gray-600 mb-1'>Expected Answer:</p>
              <p className='font-mono text-sm bg-white px-3 py-2 rounded border'>
                {question.correctAnswer}
              </p>
            </div>
            <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
              <p className='text-sm text-green-800'>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
            </div>
          </div>
        );

      case QuestionType.CHECKBOX:
        return (
          <div className='space-y-3'>
            <div className='space-y-2'>
              {question.options.map((option, index) => {
                const isCorrect = question.correctAnswers.includes(option);
                return (
                  <div key={index} className='flex items-center space-x-3'>
                    {isCorrect ? (
                      <CheckSquare className='w-5 h-5 text-green-600' />
                    ) : (
                      <Square className='w-5 h-5 text-gray-400' />
                    )}
                    <span
                      className={`text-sm ${
                        isCorrect
                          ? 'text-green-700 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
              <p className='text-sm text-green-800'>
                <strong>
                  Correct Answer{question.correctAnswers.length > 1 ? 's' : ''}:
                </strong>{' '}
                {question.correctAnswers.join(', ')}
              </p>
            </div>
          </div>
        );

      default:
        return <p className='text-gray-500'>Unknown question type</p>;
    }
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    switch (type) {
      case QuestionType.BOOLEAN:
        return 'True/False';
      case QuestionType.INPUT:
        return 'Short Answer';
      case QuestionType.CHECKBOX:
        return 'Multiple Choice';
      default:
        return 'Unknown';
    }
  };

  const getQuestionTypeColor = (type: QuestionType) => {
    switch (type) {
      case QuestionType.BOOLEAN:
        return 'bg-blue-100 text-blue-800';
      case QuestionType.INPUT:
        return 'bg-purple-100 text-purple-800';
      case QuestionType.CHECKBOX:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
      {/* Question Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <div className='flex items-center mb-2'>
            <span className='text-sm font-medium text-gray-500 mr-3'>
              Question {questionNumber}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getQuestionTypeColor(
                question.type
              )}`}
            >
              {getQuestionTypeLabel(question.type)}
            </span>
          </div>
          <h3 className='text-lg font-medium text-gray-900 leading-relaxed'>
            {question.text}
          </h3>
        </div>
      </div>

      {/* Question Content */}
      <div className='mt-4'>{renderQuestionContent()}</div>
    </div>
  );
}
