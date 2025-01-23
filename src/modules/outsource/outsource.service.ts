import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { CronJob } from 'cron';

export class OutsourceService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(OutsourceService.name);

  dummyData = [
    { matchId: '1', player: [{ id: '1', points: 2 }] },
    { matchId: '2', player: [{ id: '3', points: 1 }] },
  ];

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  async cronJobSync(existingCronJobs: string[], liveMatchesIds: string[]) {
    const scheduledCronJob: string[] = [];
    for (const matchId of liveMatchesIds) {
      if (!existingCronJobs.includes(`match_${matchId}`)) {
        scheduledCronJob.push(`match_${matchId}`);
      }
    }

    const killedCronJobs: string[] = [];
    for (const existingCron of existingCronJobs) {
      if (!liveMatchesIds.includes(existingCron.split('_')[1])) {
        killedCronJobs.push(existingCron);
      }
    }

    return { scheduledCronJob, killedCronJobs };
  }

  // TODO: for demo reduce to 30 sec
  @Cron(CronExpression.EVERY_30_SECONDS, { name: 'liveMatchCronJob' })
  async getLiveMatches() {
    this.logger.debug('Called every 30 seconds');
    const matchList = [
      { id: '1', name: 'match1' },
      { id: '2', name: 'match2' },
    ];

    await this.cacheManager.set('matchList', JSON.stringify(matchList), 30);

    return matchList;
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'updateCronJobController' })
  async updateCronJobController() {
    this.logger.debug('Called every 10 sec');
    const data = ((await this.cacheManager.get('matchList')) ??
      JSON.stringify([])) as any;

    // console.log(data);

    const liveMatches: Array<{
      id: string;
      name: string;
    }> = JSON.parse(data);
    this.logger.log('live matches', liveMatches);

    const existingCronJobs = [];

    const cronJobs = this.schedulerRegistry.getCronJobs();

    cronJobs.forEach((value, key) => {
      let next;
      this.logger.log('cronLoop', key);
      if (key.includes('match_')) {
        existingCronJobs.push(key);
      }
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });

    this.logger.log('existingCronJobs', existingCronJobs);
    const { scheduledCronJob, killedCronJobs } = await this.cronJobSync(
      existingCronJobs,
      liveMatches?.map((x) => x.id),
    );
    this.logger.log('scheduledCronJob', scheduledCronJob);
    this.logger.log('killedCronJobs', killedCronJobs);

    for (const schedulerName of scheduledCronJob) {
      this.addCronJob(schedulerName, '10');
    }

    for (const schedulerName of killedCronJobs) {
      this.deleteCron(schedulerName);
    }
    // track all existing cronjobs with match_
    // eliminate those that are exist but not in list
    // spin off new one from the list

    return { scheduledCronJob, killedCronJobs };
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
