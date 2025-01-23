import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class PlayerService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private readonly logger = new Logger(PlayerService.name);

  async findMatches() {
    try {
      this.logger.log('testing');
      // await this.cacheManager.set('test', { key: 'abc' }, 0);
      const data = await this.cacheManager.get('test');

      return { matches: [], data };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
