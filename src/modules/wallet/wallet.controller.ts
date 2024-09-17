import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern({ cmd: 'create-wallet' })
  create(@Payload() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @MessagePattern({ cmd: 'find-wallets' })
  findAll() {
    return this.walletService.findAll();
  }

  @MessagePattern({ cmd: 'find-wallet' })
  findOne(@Payload() id: string) {
    return this.walletService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-wallet' })
  update(@Payload() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto.id, updateWalletDto);
  }

  @MessagePattern({ cmd: 'remove-wallet' })
  remove(@Payload() id: string) {
    return this.walletService.remove(id);
  }
}
