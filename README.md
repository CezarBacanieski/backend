# Quiz Builder - Full Stack Application

A modern full-stack quiz creation platform built with Next.js and NestJS, allowing users to create, manage, and view custom quizzes with multiple question types.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

This is a full-stack quiz builder application developed as a technical assessment. Users can create custom quizzes with various question types, view all available quizzes in a dashboard, and examine individual quiz details.

### Key Capabilities
- Create quizzes with multiple question types (Boolean, Input, Checkbox)
- View all quizzes with search functionality
- Detailed quiz view with read-only question display
- Complete CRUD operations for quiz management
- Responsive design for all screen sizes

## ✨ Features

### Frontend Features
- 🎯 **Quiz Creation** - Intuitive form with dynamic question management
- 📝 **Multiple Question Types**:
  - **Boolean**: True/False questions with radio button selection
  - **Input**: Short answer questions with text validation
  - **Checkbox**: Multiple choice with multiple correct answers
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔍 **Search & Filter** - Real-time quiz search functionality
- ⚡ **Form Validation** - Client-side validation with Zod schemas
- 🎨 **Modern UI** - Clean, accessible interface with consistent design system

### Backend Features
- 🚀 **RESTful API** - Complete CRUD operations for quizzes
- 🔒 **Data Validation** - Server-side validation with class-validator
- 🗄️ **Database Integration** - PostgreSQL with Prisma ORM
- 📊 **Type Safety** - Full TypeScript implementation
- 🛡️ **Error Handling** - Global exception filter with proper HTTP responses
- 🔄 **CORS Support** - Configured for cross-origin requests

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React hooks

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer
- **Runtime**: Node.js

## 📁 Project Structure

```
quiz-builder/
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js 15 App Router pages
│   │   │   ├── create/     # Quiz creation page
│   │   │   ├── quizzes/    # Quiz listing and detail pages
│   │   │   │   └── [id]/   # Dynamic quiz detail page
│   │   │   ├── layout.tsx  # Root layout
│   │   │   ├── page.tsx    # Home page
│   │   │   └── globals.css # Global styles
│   │   ├── components/     # Reusable components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── quiz/       # Quiz-specific components
│   │   │   └── ui/         # Generic UI components
│   │   ├── schemas/        # Zod validation schemas
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # NestJS application
│   ├── src/
│   │   ├── quizzes/        # Quiz module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Entity definitions
│   │   │   ├── *.controller.ts
│   │   │   ├── *.service.ts
│   │   │   └── *.module.ts
│   │   ├── prisma/         # Prisma service
│   │   ├── common/         # Shared utilities
│   │   │   └── filters/    # Exception filters
│   │   ├── app.*           # App module files
│   │   └── main.ts         # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── test/               # E2E tests
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd quiz-builder
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Configure your .env file:
DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"
FRONTEND_URL="http://localhost:3000"
PORT=3001

# Set up database
npx prisma migrate deploy
npx prisma generate

# Start the backend server
npm run start:dev
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:3001

# Start the frontend server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📡 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/quizzes` | Create a new quiz |
| GET | `/quizzes` | Get all quizzes (summary) |
| GET | `/quizzes/:id` | Get quiz details |
| DELETE | `/quizzes/:id` | Delete a quiz |

### Example API Usage

#### Create Quiz
```bash
POST /quizzes
Content-Type: application/json

{
  "title": "Sample Quiz",
  "questions": [
    {
      "text": "Is TypeScript a superset of JavaScript?",
      "type": "BOOLEAN",
      "correctAnswer": "true"
    },
    {
      "text": "What is the capital of France?",
      "type": "INPUT",
      "correctAnswer": "Paris"
    },
    {
      "text": "Which are programming languages?",
      "type": "CHECKBOX",
      "options": ["JavaScript", "HTML", "Python", "CSS"],
      "correctAnswers": ["JavaScript", "Python"]
    }
  ]
}
```

#### Get All Quizzes
```bash
GET /quizzes

Response:
[
  {
    "id": "clx1234567890",
    "title": "Sample Quiz",
    "questionCount": 3,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

## 🎨 Frontend Documentation

### Pages

#### Home Page (`/`)
- Welcome page with application overview
- Quick navigation to create quiz and browse existing quizzes
- Feature highlights and getting started guide

#### Create Quiz (`/create`)
- Dynamic form for creating new quizzes
- Add/remove questions with different types
- Real-time validation feedback
- Form submission with error handling

#### Quiz List (`/quizzes`)
- Grid layout displaying all quizzes
- Search functionality for filtering
- Delete action with confirmation
- Empty state for new users

#### Quiz Details (`/quizzes/[id]`)
- Read-only display of quiz structure
- Question type indicators
- Quiz metadata (creation date, question count)
- Navigation back to quiz list

### Question Types

#### Boolean Questions
- True/False radio button selection
- Clear indication of correct answer
- Simple validation for true/false values

#### Input Questions  
- Text input for answers
- Single correct answer validation
- Display expected answer format

#### Checkbox Questions
- Multiple option support with checkboxes
- Multiple correct answers allowed
- Dynamic option management (add/remove)
- Validation for minimum options and answers

## 🗄️ Database Schema

```prisma
model Quiz {
  id          String     @id @default(cuid())
  title       String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  questions   Question[]
}

model Question {
  id             String       @id @default(cuid())
  text           String
  type           QuestionType
  options        String[]     // For checkbox questions
  correctAnswer  String?      // For input and boolean questions
  correctAnswers String[]     // For checkbox questions
  quiz           Quiz         @relation(fields: [quizId], references: [id], onDelete: Cascade)
  quizId         String
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum QuestionType {
  BOOLEAN
  INPUT
  CHECKBOX
}
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Start in development mode
npm run start:dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create and apply migration
npx prisma generate        # Generate Prisma client
```

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Fix linting errors
npm run lint:fix

# Type checking
npm run type-check
```

### Code Quality

Both frontend and backend include:
- **ESLint** - Code linting with consistent rules
- **Prettier** - Code formatting
- **TypeScript** - Type safety throughout the application
- **Validation** - Runtime validation for data integrity

## 🚀 Deployment

### Backend Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables:
```bash
DATABASE_URL="your-production-database-url"
FRONTEND_URL="your-frontend-url"
PORT=3001
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables:
```bash
NEXT_PUBLIC_API_URL="your-backend-url"
```

3. Start the production server:
```bash
npm run start
```

## 🔐 Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"
FRONTEND_URL="http://localhost:3000"
PORT=3001
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

### Creating a Sample Quiz

1. Navigate to `/create`
2. Enter a quiz title: "Sample Technical Quiz"
3. Add a Boolean question: "Is React a JavaScript library?" (Answer: true)
4. Add an Input question: "What does API stand for?" (Answer: "Application Programming Interface")
5. Add a Checkbox question: "Which are JavaScript frameworks?" 
   - Options: React, Angular, Vue, jQuery
   - Correct answers: React, Angular, Vue
6. Submit the form

## 📝 Additional Notes

- The application uses PostgreSQL as the primary database
- All API responses include proper HTTP status codes
- Form validation occurs both client-side and server-side
- The application is fully responsive and accessible
- Error handling provides meaningful feedback to users
- Database relationships use cascading deletes to maintain data integrity

## 🔍 Technical Decisions

- **NestJS**: Chosen for its robust architecture and TypeScript support
- **Prisma**: Selected for type-safe database operations and migrations
- **Next.js App Router**: Used for modern React development with server components
- **Tailwind CSS**: Implemented for rapid UI development and consistency
- **React Hook Form + Zod**: Combined for efficient form handling and validation

---

This application demonstrates modern full-stack development practices with emphasis on type safety, user experience, and code quality.