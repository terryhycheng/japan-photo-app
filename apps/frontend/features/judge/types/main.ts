import { z } from "zod";

// export const photoDataSchema = z.object({
//   id: z.string(),
//   photo_id: z.string(),
//   url: z.string(),
//   original_filename: z.string(),
//   selected: z.boolean().optional(),
//   judge: z
//     .object({
//       scores: z.record(z.array(z.number())).optional(),
//       comment: z.string().optional().nullable(),
//       categoryId: z.string().optional(),
//     })
//     .optional(),
//   author: z.object({
//     id: z.string(),
//     name: z.string(),
//   }),
// });

export const photoDataSchema = z.object({
  _id: z.string(),
  author: z.object({
    _id: z.string(),
    code: z.string(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
  original_filename: z.string(),
  photo_id: z.string(),
  is_selected: z.boolean(),
  url: z.string(),
  __v: z.number(),
});

export type PhotoData = z.infer<typeof photoDataSchema>;

export type Category = {
  id: string;
  name: string;
  description: string;
  special?: boolean;
  award?: PhotoData;
};
