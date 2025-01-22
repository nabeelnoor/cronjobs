import { Module } from '@nestjs/common';

import { PlayersService } from './service/players.service';
import { PlayersController } from './controller/players.controller';

@Module({
  imports: [],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
