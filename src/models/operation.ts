import { IWallet, OperationStatus, WalletType } from '.';
import { OperationType } from './operation-type';

export default interface IOperation {
  id: string;
  reference: string;
  type: OperationType;
  initiator: any;
  debitAccount: any;
  creditAccount: any;
  aggregator: string;
  method: string;
  service: string;
  document: string;
  walletType: WalletType;
  status: OperationStatus;
  wallet: IWallet;
  amount: number;
  processesToDo: number;
  processesDone: number;
}
