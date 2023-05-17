import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupColumn } from 'src/entities/group-columns.entity';
import { GroupBoardModule } from '../group-board/group-board.module';
import { GroupColumnResolver } from './group-column.resolver';
import { GroupColumnService } from './group-column.service';

@Module({
  imports: [GroupBoardModule, TypeOrmModule.forFeature([GroupColumn])],
  providers: [GroupColumnResolver, GroupColumnService],
  exports: [GroupColumnService],
})
export class GroupColumnModule {}
