import { z } from 'zod';

export const createPinSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters'),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional(),
  boardId: z.string().uuid('Invalid board ID').optional(),
  categoryId: z.string().uuid('Invalid category ID').optional(),
  tags: z.array(z.string()).max(20, 'Maximum 20 tags allowed').optional(),
  originalUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  altText: z.string().max(255).optional(),
});

export const updatePinSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional(),
  boardId: z.string().uuid('Invalid board ID').optional().nullable(),
  tags: z.array(z.string()).max(20, 'Maximum 20 tags allowed').optional(),
  altText: z.string().max(255).optional(),
});

export const savePinSchema = z.object({
  boardId: z.string().uuid('Invalid board ID'),
  note: z.string().max(500, 'Note must be at most 500 characters').optional(),
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(500, 'Comment must be at most 500 characters'),
  parentCommentId: z.string().uuid('Invalid parent comment ID').optional(),
});

export const pinsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  categoryId: z.string().uuid().optional(),
  sort: z.enum(['recent', 'trending', 'popular']).default('recent'),
  tags: z.string().optional(), // Comma-separated tags
});

export type CreatePinInput = z.infer<typeof createPinSchema>;
export type UpdatePinInput = z.infer<typeof updatePinSchema>;
export type SavePinInput = z.infer<typeof savePinSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type PinsQueryInput = z.infer<typeof pinsQuerySchema>;
