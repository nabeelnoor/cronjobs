import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CRON_JOB_PREFIX } from './utils';

@Injectable()
export class CronJobService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(CronJobService.name);

  async healthCheck() {
    this.logger.log('checking health for cronjob service');
    this.schedulerRegistry.getCronJobs();
    return { status: 'ok' };
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  addCronJob(name: string, seconds: string, cronJobTask?: () => void) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.log('testing task, debugging', cronJobTask);
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  getExistingCronJobs(cronKeySearchStr: string): Array<string> {
    const existingCronJobs: Array<string> = [];

    const cronJobs = this.schedulerRegistry.getCronJobs();
    for (const cron of cronJobs) {
      const [key] = cron;
      this.logger.log('iterating crons', key);
      if (key.includes(cronKeySearchStr)) {
        existingCronJobs.push(key);
      }
    }
    return existingCronJobs;
  }

  /**
   * compare and sync cronjobs with live matches and return list of schedule and killed cronjobs
   */
  async cronJobSync(existingCronJobs: string[], liveMatchesIds: string[]) {
    this.logger.log('tracking existing cronJob', existingCronJobs);
    this.logger.log('tracking live matches', liveMatchesIds);

    const cronJobsToSchedule: string[] = [];
    for (const matchId of liveMatchesIds) {
      if (
        !existingCronJobs.includes(`${CRON_JOB_PREFIX.LIVE_MATCH}_${matchId}`)
      ) {
        cronJobsToSchedule.push(`${CRON_JOB_PREFIX.LIVE_MATCH}_${matchId}`);
      }
    }

    const cronJobsToKilled: string[] = [];
    for (const existingCron of existingCronJobs) {
      const matchIdFromCronJob = existingCron.split(
        `${CRON_JOB_PREFIX.LIVE_MATCH}_`,
      )[1];
      if (!liveMatchesIds.includes(matchIdFromCronJob)) {
        cronJobsToKilled.push(existingCron);
      }
    }

    this.logger.log('cronToSchedule', cronJobsToSchedule);
    this.logger.log('cronJobsToKilled', cronJobsToKilled);
    return { cronJobsToSchedule, cronJobsToKilled };
  }
}
