import { WalletType } from './wallet-type';

export default interface IWallet {
  id: string;
  accountId: string;
  balance: number;
  type: WalletType;
}
