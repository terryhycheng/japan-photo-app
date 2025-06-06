import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Photo } from './photo.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  description: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  is_special: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' })
  awardPhoto?: Photo;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
