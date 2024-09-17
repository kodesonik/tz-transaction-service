import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OperationType } from 'src/models/operation-type';

export class CreateOperationDto {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsString()
  initiator: string;

  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  beneficiary: string;

  @IsNotEmpty()
  @IsEnum(OperationType)
  type: OperationType;

  @IsNotEmpty()
  @IsString()
  aggregator: string;
}
