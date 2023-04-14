import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupBoard } from 'src/entities/group-board.entity';
import { GroupModule } from '../groups/group.module';
import { GroupBoardResolver } from './group-board.resolver';
import { GroupBoardService } from './group-board.service';

@Module({
  imports: [GroupModule, TypeOrmModule.forFeature([GroupBoard])],
  providers: [GroupBoardResolver, GroupBoardService],
  exports: [GroupBoardService],
})
export class GroupBoardModule {}
