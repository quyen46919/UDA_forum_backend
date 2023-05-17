import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from 'src/entities/group-member.entity';
import { GroupMemberResolver } from './group-member.resolver';
import { GroupMemberService } from './group-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMember])],
  providers: [GroupMemberResolver, GroupMemberService],
  exports: [GroupMemberService],
})
export class GroupMemberModule {}
