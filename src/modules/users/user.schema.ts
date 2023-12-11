import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Base } from 'src/@base/entity/base.entity';
import { RoleType } from './types/user.types';
import { generateHash } from 'src/@common/utilities/utils';

export type UserDocument = User & mongoose.Document;

@Schema({ autoCreate: true })
export class User extends Base {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password: string | null;

  @Prop({ type: String, required: false })
  aboutMe: string | null;

  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  bodyFat: number;

  @Prop({ type: String, required: false })
  phone: string | null;

  @Prop({ type: String, required: false })
  avatar: string | null;

  @Prop({ type: String, enum: RoleType, default: RoleType.USER })
  role: RoleType;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await generateHash(this.password);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
