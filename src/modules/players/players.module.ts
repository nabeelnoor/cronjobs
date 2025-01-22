import { Module } from '@nestjs/common';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

@Module({
  imports: [],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
