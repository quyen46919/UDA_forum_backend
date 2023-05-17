import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { GroupBoard } from 'src/entities/group-board.entity';
import ConnectionArgs, { pagingParams } from 'src/shared/agrs/connection.args';
import { CreateGroupBoardInput } from './dto/create-group-board.dto';
import GroupBoardResponse from './dto/group-board-response.type';
import { UpdateGroupBoardInput } from './dto/update-group-board.dto';
import { GroupBoardService } from './group-board.service';

@Resolver(() => GroupBoard)
export class GroupBoardResolver {
  constructor(private groupBoardService: GroupBoardService) {}

  @Query(() => GroupBoardResponse, { name: 'groupBoards' })
  async queryGroupBoardById(
    @Args() args: ConnectionArgs,
    @Args('groupId') groupId: string,
  ) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.groupBoardService.findAllChildOnBoard(
      limit,
      offset,
      groupId,
    );

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  // @Query(() => GroupBoard, { name: 'groupBoard' })
  // getBoard(@Args('groupId') groupId: string) {
  //   return this.groupBoardService.findOneWithRelations(groupId);
  // }

  @Mutation(() => GroupBoard, { description: 'Create group board' })
  createGroupBoard(
    @Args('createGroupBoardInput')
    createGroupBoardInput: CreateGroupBoardInput,
  ) {
    return this.groupBoardService.create(createGroupBoardInput);
  }

  @Mutation(() => GroupBoard, { description: 'Update group board' })
  updateGroupBoard(
    @Args('updateGroupBoardInput')
    updateGroupBoardInput: UpdateGroupBoardInput,
  ) {
    return this.groupBoardService.update(updateGroupBoardInput);
  }
}
