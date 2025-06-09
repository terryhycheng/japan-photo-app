import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Author } from './author.schema';
import { Category } from './categories.schema';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: Author;

  @Prop({ required: true })
  original_filename: string;

  @Prop({ required: true })
  photo_id: string;

  @Prop({ default: false })
  is_selected: boolean;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  judge?: {
    scores?: Record<string, number[]>;
    comment?: string;
    categoryId?: mongoose.Types.ObjectId | Category;
  };
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
