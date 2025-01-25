import { Controller, Get } from '@nestjs/common';
import { OutsourceService } from './outsource.service';
import { CronJobService } from './cronJob.service';

@Controller('outsource')
export class OutsourceController {
  constructor(
    private readonly outsourceService: OutsourceService,
    private readonly cronJobService: CronJobService,
  ) {}

  @Get('/health')
  async healthCheck() {
    await this.outsourceService.healthCheck();
    await this.cronJobService.healthCheck();
    return { status: 'ok' };
  }
}
