import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';

import { PlayersService } from './players.service';

@Controller('matches')
export class PlayersController {
  constructor(
    private configService: ConfigService,
    private projectService: PlayersService,
  ) {}

  @Get('/')
  getAllProjects() {
    try {
      return this.projectService.findMatches();
    } catch (err) {}
  }
  // getProjects() {
  //   this.logger.log('logging from nest logger');
  //   const sample = {
  //     dbName: this.configService.get<string>('DB_NAME'),
  //     db: this.configService.get('database'),
  //   };
  //   return sample;
  // }
}
