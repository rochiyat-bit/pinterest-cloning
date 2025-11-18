import { z } from 'zod';

export const searchSchema = z.object({
  q: z.string().min(1, 'Search query is required').max(255),
  type: z.enum(['pins', 'boards', 'users', 'all']).default('pins'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  categoryId: z.string().uuid().optional(),
  sort: z.enum(['relevant', 'recent', 'popular']).default('relevant'),
});

export const suggestionsSchema = z.object({
  q: z.string().min(1, 'Query is required').max(255),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type SearchInput = z.infer<typeof searchSchema>;
export type SuggestionsInput = z.infer<typeof suggestionsSchema>;
