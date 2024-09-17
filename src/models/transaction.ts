import IOperation from './operation';
import { TransactionType } from './transaction-type';

export default interface ITransaction {
  operation: IOperation;
  type: TransactionType;
  balanceBeforeOperation: number;
  balanceAfterOperation: number;
  account: any;
}
