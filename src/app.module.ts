import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from 'config/configuration';
import { PlayersModule } from 'src/modules/players/players.module';
// import { CacheModule } from 'src/modules/cache/cache.module';
// import * as config from 'config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
@Module({
  imports: [
    PlayersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [new KeyvRedis('redis://localhost:6378')],
        };
      },
      isGlobal: true,
    }),
    // CacheModule.forRoot({
    //   endPoint: 'localhost',
    //   port: +'6378',
    //   redisPrefix: 'dev',
    //   password: '123456',
    //   username: 'default',
    // }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
