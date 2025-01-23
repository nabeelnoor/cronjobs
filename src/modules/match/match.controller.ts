import { Controller, Get } from '@nestjs/common';

import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('/check')
  startMatchChecking() {
    try {
      return { status: 'ok' };
    } catch (err) {}
  }
  @Get('/stop')
  stopMatchChecking() {
    return { status: 'ok' };
    // logic to wipe out all crons
  }

  @Get('/')
  health() {
    return { status: 'ok' };
  }
}
