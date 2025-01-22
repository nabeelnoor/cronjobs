import { Logger } from '@nestjs/common';

export class ProjectService {
  constructor() {}
  private readonly logger = new Logger(ProjectService.name);

  async findMatches() {
    try {
      this.logger.log('testing');
      return { matches: [] };
    } catch (err) {
      console.log(err);
    }
  }
}
