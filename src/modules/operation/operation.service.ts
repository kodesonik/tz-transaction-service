import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operation } from './schemas/operation.schema';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationType } from 'src/models/operation-type';
import { OperationStatus, WalletType } from 'src/models';
import { Wallet } from '../wallet/schemas/wallet.schema';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation.name)
    private readonly operationModel: Model<Operation>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
    @Inject('MESSAGING_SERVICE') private readonly messagingService: ClientProxy,
  ) {}

  private async generateReference(length: number): Promise<string> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    if (await this.getReference(result)) {
      return this.generateReference(length);
    }
    return result;
  }

  async getReference(reference: string): Promise<string | null> {
    const operation = await this.operationModel.findOne({ reference });
    return operation ? operation._id.toString() : null;
  }

  async createRechargeOperation(reference: string, data: CreateOperationDto) {
    return this.operationModel.create({
      ...data,
      reference,
      type: OperationType.DEPOSIT,
      processesToDo: 2,
      processesDone: 1,
      status: OperationStatus.PENDING,
      walletType: WalletType.CASH,
    });
  }

  async getAccount(accountId: string) {
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'find-one-user' }, { id: accountId }),
    );
    if (res && res.error) {
      throw new Error(res.error);
    }
    console.log('res', res);
    return res.doc;
  }

  async create(createOperationDto: CreateOperationDto) {
    try {
      const reference = await this.generateReference(10);
      console.log(reference);

      const initiator = await this.getAccount(createOperationDto.initiator);
      if (!initiator) {
        return { error: 'error.INITIATOR_NOT_FOUND' };
      }
      if (!initiator.active) {
        return { error: 'error.INITIATOR_NOT_ACTIVE' };
      }
      const sender = await this.getAccount(createOperationDto.sender);
      if (!sender) {
        return { error: 'error.SENDER_NOT_FOUND' };
      }
      if (!sender.active) {
        return { error: 'error.SENDER_NOT_ACTIVE' };
      }
      const beneficiary = await this.getAccount(createOperationDto.beneficiary);
      if (!beneficiary) {
        return { error: 'error.BENEFICIARY_NOT_FOUND' };
      }
      if (!beneficiary.active) {
        return { error: 'error.BENEFICIARY_NOT_ACTIVE' };
      }

      switch (createOperationDto.type) {
        case OperationType.DEPOSIT:
          await this.createRechargeOperation(reference, {
            ...createOperationDto,
            initiator,
            sender,
            beneficiary,
          });
          break;
        default:
          return { message: 'Operation type not supported' };
      }
      return { message: 'success.OPERATION_PENDING', reference };
    } catch (err) {
      console.log(err.message);
      return { error: 'error.OPERATION_FAILED' };
    }
  }

  findAll() {
    return this.operationModel.find();
  }

  findOne(id: string) {
    return this.operationModel.findById(id);
  }

  update(id: string, updateOperationDto: UpdateOperationDto) {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto);
  }

  remove(id: string) {
    return this.operationModel.findByIdAndDelete(id);
  }
}
