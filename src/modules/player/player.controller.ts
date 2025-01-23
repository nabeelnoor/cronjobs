import { Controller, Get } from '@nestjs/common';

import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get('/')
  getAllProjects() {
    try {
      return this.playerService.findMatches();
    } catch (err) {}
  }
}
