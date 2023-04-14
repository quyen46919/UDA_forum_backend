import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupCard } from 'src/entities/group-card.entity';
import { GroupCardResolver } from './group-card.resolver';
import { GroupCardService } from './group-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupCard])],
  providers: [GroupCardResolver, GroupCardService],
  exports: [GroupCardService],
})
export class GroupCardModule {}
