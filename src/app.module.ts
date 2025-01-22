import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from 'config/configuration';
import { ProjectModule } from 'src/modules/project/project.module';

@Module({
  imports: [
    ProjectModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
