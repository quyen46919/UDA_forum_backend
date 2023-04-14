import { ObjectType } from '@nestjs/graphql';
import { GroupBoard } from 'src/entities/group-board.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class GroupBoardResponse extends relayTypes<GroupBoard>(
  GroupBoard,
) {}
