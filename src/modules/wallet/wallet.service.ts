import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    console.log('createWalletDto', createWalletDto);
    return this.walletModel.create(createWalletDto);
  }

  findAll() {
    return this.walletModel.find();
  }

  findOne(id: string) {
    return this.walletModel.findById(id);
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.walletModel.findByIdAndUpdate(id, updateWalletDto);
  }

  remove(id: string) {
    return this.walletModel.findByIdAndDelete(id);
  }
}
