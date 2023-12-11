import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class Base {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
