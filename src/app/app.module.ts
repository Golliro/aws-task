import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoModule } from '@modules/cognito/request.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    CognitoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
