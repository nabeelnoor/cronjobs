import { Module } from '@nestjs/common';

import { OutsourceService } from './outsource.service';

@Module({
  imports: [],
  providers: [OutsourceService],
  exports: [OutsourceService],
})
export class OutsourceModule {}
