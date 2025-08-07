import fetcher from "@/utils/fetcher";
import { Quiz, CreateQuizRequest, UpdateQuizRequest, GetQuizzesRequest } from "@/types/quiz.type";
import { PaginationResponse } from "@/types/pagination.type";

export const createQuiz = async (data: CreateQuizRequest): Promise<Quiz> => {
  const response = await fetcher.post<Quiz>("/quiz", { body: data });
  return response;
};

export const getAllQuizzes = async (params?: GetQuizzesRequest): Promise<PaginationResponse<Quiz>> => {
  const query = new URLSearchParams();
  if (params) {
    for (const key in params) {
      if (params[key as keyof GetQuizzesRequest] !== undefined) {
        query.append(key, String(params[key as keyof GetQuizzesRequest]));
      }
    }
  }
  const response = await fetcher.get<PaginationResponse<Quiz>>(`/quiz?${query.toString()}`);
  return response;
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  const response = await fetcher.get<Quiz>(`/quiz/${id}`);
  return response;
};

export const updateQuiz = async (id: string, data: UpdateQuizRequest): Promise<Quiz> => {
  const response = await fetcher.put<Quiz>(`/quiz/${id}`, { body: data });
  return response;
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await fetcher.delete<void>(`/quiz/${id}`);
};
