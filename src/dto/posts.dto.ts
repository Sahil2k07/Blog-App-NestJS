import z from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim(),
  content: z.string().trim(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  id: z.string().trim(),
  title: z.string().trim().optional(),
  content: z.string().trim().optional(),
});

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
