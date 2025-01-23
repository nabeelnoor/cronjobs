import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class OutsourceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private readonly logger = new Logger(OutsourceService.name);

  dummyData = [
    { matchId: '1', player: [{ id: '1', points: 2 }] },
    { matchId: '2', player: [{ id: '3', points: 1 }] },
  ];

  getLiveMatches() {
    return [
      { id: '1', name: 'match1' },
      { id: '2', name: 'match2' },
    ];
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
