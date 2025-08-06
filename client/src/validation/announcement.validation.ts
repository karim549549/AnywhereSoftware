import { z } from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type AnnouncementFormValues = z.infer<typeof announcementSchema>;
