import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { CognitoModule } from '@modules/cognito/request.module';
import { UserModule } from '@modules/user/user.module';
import { KolModule } from '@modules/kol/kol.module';
import { AuthModule } from '@modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    UserModule,
    KolModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
