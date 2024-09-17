import { Module } from '@nestjs/common';
import { OperationGateway } from './operation.gateway';
import { OperationService } from './operation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './schemas/operation.schema';
import { Wallet, WalletSchema } from '../wallet/schemas/wallet.schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Operation.name,
        schema: OperationSchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
  ],
  controllers: [OperationGateway],
  providers: [
    OperationService,
    {
      provide: 'AUTHENTICATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(
          configService.get('authenticationService'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: 'MESSAGING_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('messagingService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class OperationModule {}
