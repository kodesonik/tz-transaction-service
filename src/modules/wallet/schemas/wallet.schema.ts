import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IWallet, WalletType } from 'src/models';

export type WalletDocument = HydratedDocument<IWallet>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Wallet implements Omit<IWallet, 'id'> {
  @Prop({ enum: WalletType, default: WalletType.CASH })
  type: WalletType;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ required: true })
  accountId: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
