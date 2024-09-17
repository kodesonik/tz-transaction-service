import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Controller()
export class OperationGateway {
  constructor(private readonly operationService: OperationService) {}

  @MessagePattern({ cmd: 'create-operation' })
  create(@Payload() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @MessagePattern({ cmd: 'find-operations' })
  findAll() {
    return this.operationService.findAll();
  }

  @MessagePattern({ cmd: 'find-operation' })
  findOne(@Payload() id: string) {
    return this.operationService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-operation' })
  update(@Payload() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(
      updateOperationDto.id,
      updateOperationDto,
    );
  }

  @MessagePattern({ cmd: 'remove-operation' })
  remove(@Payload() id: string) {
    return this.operationService.remove(id);
  }
}
