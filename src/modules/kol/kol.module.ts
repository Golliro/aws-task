import { Module } from '@nestjs/common';
import { KolController } from './kol.controller';
import { KolService } from './kol.service';

@Module({
  imports: [],
  controllers: [KolController],
  providers: [KolService],
})
export class KolModule {}
