import { Logger } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Mongoose middleware for logging
UserSchema.pre<UserDocument>('save', function(next) {
  const logger = new Logger('UserModel');
  logger.log(`Saving user document with email: ${this.email}`);
  next();
});

UserSchema.post<UserDocument>('save', function(doc, next) {
  const logger = new Logger('UserModel');
  logger.log(`User document saved successfully with email: ${doc.email}`);
  next();
});
