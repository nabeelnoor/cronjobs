import { Module } from '@nestjs/common';

import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
