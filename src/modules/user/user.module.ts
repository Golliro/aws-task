import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CognitoService } from '@modules/cognito/cognito.service';
import { UserService } from './user.service';
@Module({
  imports: [CognitoService],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class PaymentModule {}
