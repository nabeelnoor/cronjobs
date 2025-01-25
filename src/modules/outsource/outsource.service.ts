import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { CRON_JOB_PREFIX } from './utils';
import { CronJobService } from './cronJob.service';

@Injectable()
export class OutsourceService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cronJobService: CronJobService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(OutsourceService.name);

  dummyData = [
    { matchId: '1', player: [{ id: '1', points: 2 }] },
    { matchId: '2', player: [{ id: '3', points: 1 }] },
  ];

  async healthCheck() {
    this.schedulerRegistry.getCronJobs();
    return { status: 'ok' };
  }

  /**
   * fetch and prepare list of live matches every 1 hr
   */
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'liveMatchCronJob' })
  async getLiveMatches() {
    const matchList = [
      { id: '1', name: 'match1' },
      { id: '2', name: 'match2' },
    ];

    this.logger.log('update Live match cache => every 1 hr');
    await this.cacheManager.set('matchList', JSON.stringify(matchList), 0);
    await this.matchDetailsCronJobController();
    return matchList;
  }

  async matchDetailsCronJobController() {
    const matchList = ((await this.cacheManager.get('matchList')) ??
      JSON.stringify([])) as any;

    const liveMatches: Array<{
      id: string;
      name: string;
    }> = JSON.parse(matchList);

    const liveMatchCronJobs = this.cronJobService.getExistingCronJobs(
      `${CRON_JOB_PREFIX.LIVE_MATCH}_`,
    );

    const { cronJobsToSchedule, cronJobsToKilled } =
      await this.cronJobService.cronJobSync(
        liveMatchCronJobs,
        liveMatches?.map((x) => x.id),
      );

    for (const schedulerName of cronJobsToSchedule) {
      this.cronJobService.addCronJob(schedulerName, '15');
    }

    for (const schedulerName of cronJobsToKilled) {
      this.cronJobService.deleteCron(schedulerName);
    }

    return {
      scheduledCronJob: cronJobsToSchedule,
      killedCronJobs: cronJobsToKilled,
    };
  }

  getMatchDetails(matchIds: string[]) {
    const updates = [];
    for (const data of this.dummyData) {
      if (matchIds.includes(data.matchId)) {
        updates.push(data);
      }
    }
    return updates;
  }
}
