import { z } from "zod";

export const QUIZ_TYPES = ["quiz", "assignment", "exam"] as const;

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(QUIZ_TYPES),
  questions: z
    .array(
      z
        .object({
          text: z.string().min(1, "Question text is required"),
          options: z
            .array(z.string().min(1, "Option cannot be empty"))
            .min(2, "At least two options are required"),
          correctAnswer: z.string().min(1, "Correct answer is required"),
        })
        .refine((data) => data.options.includes(data.correctAnswer), {
          message: "Correct answer must be one of the provided options",
          path: ["correctAnswer"], // Path to the field that caused the error
        })
    )
    .min(1, "At least one question is required"),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
