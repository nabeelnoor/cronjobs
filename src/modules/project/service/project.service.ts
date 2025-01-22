import { Logger } from 'src/lib';

export class ProjectService {
  constructor(private logger: Logger) {}

  async findMatches() {
    this.logger.log('testing');
    return { matches: [] };
  }
}
