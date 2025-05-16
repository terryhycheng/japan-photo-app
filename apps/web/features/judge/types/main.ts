export type MarkingScheme = {};

export type PhotoData = {
  id: string;
  photo_id: string;
  url: string;
  original_filename: string;
  selected?: boolean;
  judge?: {
    scores: {
      [key: string]: number;
    };
    comment: string;
    category?: string;
  };
  author: {
    id: string;
    name: string;
  };
};
