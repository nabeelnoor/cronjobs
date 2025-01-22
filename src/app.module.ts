import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from 'config/configuration';
import { PlayersModule } from 'src/modules/players/players.module';

@Module({
  imports: [
    PlayersModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
