# Quiz Builder Frontend

A modern React/Next.js application for creating and managing custom quizzes with multiple question types.

## Features

- 🎯 **Create Custom Quizzes** - Build quizzes with multiple question types
- 📝 **Multiple Question Types**:
  - Boolean (True/False)
  - Input (Short Answer)
  - Checkbox (Multiple Choice)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Find quizzes quickly
- ⚡ **Real-time Validation** - Form validation with immediate feedback
- 🎨 **Modern UI** - Clean, accessible interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js 15 App Router pages
│   ├── create/         # Quiz creation page
│   ├── quizzes/        # Quiz listing and detail pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── layout/        # Layout components
│   ├── quiz/          # Quiz-specific components
│   └── ui/            # Generic UI components
├── hooks/             # Custom React hooks
├── schemas/           # Zod validation schemas
├── services/          # API services
└── types/             # TypeScript type definitions
```

## Pages

### Home Page (`/`)
- Welcome page with feature overview
- Quick access to create quiz and browse quizzes
- Getting started guide

### Create Quiz (`/create`)
- Form to create new quizzes
- Dynamic question management (add/remove)
- Real-time validation
- Support for all question types

### Quiz List (`/quizzes`)
- Display all created quizzes
- Search functionality
- Quick delete action
- Empty state for new users

### Quiz Details (`/quizzes/[id]`)
- View complete quiz structure
- Read-only question display
- Quiz metadata (creation date, question count)
- Delete quiz option

## Question Types

### Boolean (True/False)
- Simple true/false questions
- Radio button selection for correct answer

### Input (Short Answer)
- Text-based questions
- Single correct answer validation

### Checkbox (Multiple Choice)
- Multiple options support
- Multiple correct answers allowed
- Dynamic option management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

### Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript** - Type safety
- **Prettier** - Code formatting (via ESLint)

## API Integration

The frontend communicates with the backend API through:

- `POST /quizzes` - Create new quiz
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get quiz details
- `DELETE /quizzes/:id` - Delete quiz

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on multiple screen sizes
4. Ensure accessibility standards