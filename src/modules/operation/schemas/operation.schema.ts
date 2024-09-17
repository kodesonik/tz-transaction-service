import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOperation, IWallet, OperationStatus, WalletType } from 'src/models';
import { OperationType } from 'src/models/operation-type';

export type OperationDocument = HydratedDocument<IOperation>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Operation implements Omit<IOperation, 'id'> {
  @Prop({ required: true })
  reference: string;

  @Prop({ required: true, type: Object })
  creditAccount: any;

  @Prop({ required: true, type: Object })
  initiator: any;

  @Prop({ required: true, type: Object })
  debitAccount: any;

  @Prop({ required: true })
  type: OperationType;

  @Prop({ default: 'default' })
  aggregator: string;

  @Prop({ default: 'default' })
  method: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true, type: Object })
  wallet: IWallet;

  @Prop({ required: true })
  walletType: WalletType;

  @Prop({ default: OperationStatus.PENDING })
  status: OperationStatus;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  processesToDo: number;

  @Prop({ required: true })
  processesDone: number;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
