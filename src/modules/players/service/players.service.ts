import { Logger } from '@nestjs/common';

export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  async findMatches() {
    try {
      this.logger.log('testing');
      return { matches: [] };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
