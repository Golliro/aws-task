import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { CognitoModule } from '@modules/cognito/request.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
