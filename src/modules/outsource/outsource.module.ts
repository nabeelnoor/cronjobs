import { Module } from '@nestjs/common';

import { OutsourceService } from './outsource.service';
import { CronJobService } from './cronJob.service';
import { OutsourceController } from './outsource.controller';

@Module({
  imports: [],
  controllers: [OutsourceController],
  providers: [OutsourceService, CronJobService],
  exports: [OutsourceService, CronJobService],
})
export class OutsourceModule {}
