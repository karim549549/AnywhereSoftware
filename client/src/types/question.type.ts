export interface IQuestion {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctAnswer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuestionDto {
  quizId: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface IUpdateQuestionDto {
  quizId?: string;
  text?: string;
  options?: string[];
  correctAnswer?: string;
}
