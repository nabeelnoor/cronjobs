import { Module } from '@nestjs/common';

import { Logger } from 'src/lib';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, Logger],
  exports: [ProjectService],
})
export class ProjectModule {}
