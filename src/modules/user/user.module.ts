import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CognitoModule } from '@modules/cognito/cognito.module';
import { UserService } from './user.service';
@Module({
  imports: [CognitoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
