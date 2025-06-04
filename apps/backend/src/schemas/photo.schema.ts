import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Author } from './author.schema';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: Author;

  @Prop({ required: true })
  original_filename: string;

  @Prop({ required: true })
  photo_id: string;

  @Prop({ required: true })
  is_selected: boolean;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  scores: Record<string, number[]>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
