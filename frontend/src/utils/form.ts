import { FieldError } from 'react-hook-form';

/**
 * Safely extracts error message from React Hook Form field error
 */
export function getFieldErrorMessage(
  error: FieldError | string | undefined
): string | undefined {
  if (!error) return undefined;

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && 'message' in error) {
    return error.message;
  }

  return undefined;
}

/**
 * Checks if a field has an error
 */
export function hasFieldError(error: any): boolean {
  return Boolean(
    error &&
      (typeof error === 'string' ||
        (typeof error === 'object' && 'message' in error))
  );
}
