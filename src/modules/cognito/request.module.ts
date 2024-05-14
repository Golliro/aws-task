import { Module } from '@nestjs/common';
// import { CongitoController } from './cognito.controller';
import { CognitoService } from './cognito.service';
@Module({
  imports: [],
  controllers: [],
  providers: [CognitoService],
  exports: [CognitoService],
})
export class CognitoModule {}
