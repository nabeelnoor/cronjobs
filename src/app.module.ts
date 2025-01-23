import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from 'src/modules/player/player.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import * as config from 'config';
import { MatchModule } from './modules/match/match.module';
import { OutsourceModule } from './modules/outsource/outsource.module';
import { ScheduleModule } from '@nestjs/schedule';

const redisUserName = config.get<string>('redis.username');
const redisPassword = config.get<string>('redis.password');
const redisPort = config.get<string>('redis.port');
const redisHost = config.get<string>('redis.endpoint');
const redisConnectionString = `redis://${redisUserName}:${redisPassword}@${redisHost}:${redisPort}`;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PlayerModule,
    MatchModule,
    OutsourceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [new KeyvRedis(redisConnectionString)],
        };
      },
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
