import { z } from "zod";

export const photoDataSchema = z.object({
  id: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
  }),
  judge: z
    .object({
      scores: z.record(z.array(z.number())).optional(),
      comment: z.string().optional().nullable(),
      categoryId: z.string().optional(),
    })
    .optional(),
  original_filename: z.string(),
  photo_id: z.string(),
  is_selected: z.boolean(),
  url: z.string(),
});

export type PhotoData = z.infer<typeof photoDataSchema>;

export type Category = {
  _id: string;
  description: string;
  name: string;
  is_special: boolean;
  awardPhoto?: string;
  createdAt: Date;
  updatedAt: Date;
};
