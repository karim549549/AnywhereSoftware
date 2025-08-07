export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  quizId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionRequest {
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  questions: CreateQuestionRequest[];
}

export interface UpdateQuestionRequest {
  text?: string;
  options?: string[];
  correctAnswer?: string;
}

export interface UpdateQuizRequest {
  title?: string;
  description?: string;
  questions?: CreateQuestionRequest[]; // For replacing all questions
}

export interface GetQuizzesRequest {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  orderBy?: 'asc' | 'desc';
}