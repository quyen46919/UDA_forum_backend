import { ObjectType } from '@nestjs/graphql';
import { GroupMember } from 'src/entities/group-member.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class GroupMemberResponse extends relayTypes<GroupMember>(
  GroupMember,
) {}
