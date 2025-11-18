import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Board name is required')
    .max(100, 'Board name must be at most 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),
  isPrivate: z.boolean().default(false),
  isSecret: z.boolean().default(false),
  categoryId: z.string().uuid('Invalid category ID').optional(),
});

export const updateBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Board name is required')
    .max(100, 'Board name must be at most 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),
  isPrivate: z.boolean().optional(),
  isSecret: z.boolean().optional(),
  categoryId: z.string().uuid('Invalid category ID').optional().nullable(),
});

export const addCollaboratorSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  role: z.enum(['editor', 'viewer']).default('viewer'),
});

export const updateCollaboratorRoleSchema = z.object({
  role: z.enum(['editor', 'viewer']),
});

export const boardsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  userId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  isPrivate: z.coerce.boolean().optional(),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
export type AddCollaboratorInput = z.infer<typeof addCollaboratorSchema>;
export type UpdateCollaboratorRoleInput = z.infer<typeof updateCollaboratorRoleSchema>;
export type BoardsQueryInput = z.infer<typeof boardsQuerySchema>;
