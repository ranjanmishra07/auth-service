import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, Matches, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  // @IsString()
  // @MinLength(8)
  // @Matches(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
  // @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
  // @Matches(/.*\W.*/, { message: 'Password must contain at least one special character' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);