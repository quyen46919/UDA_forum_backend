import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GroupColumn } from 'src/entities/group-columns.entity';
import { CreateGroupColumnInput } from './dto/create-group-column.dto';
import { GroupColumnService } from './group-column.service';

@Resolver(() => GroupColumn)
export class GroupColumnResolver {
  constructor(private groupColumnService: GroupColumnService) {}

  @Mutation(() => GroupColumn, { description: 'Create group column' })
  createGroupColumn(
    @Args('createGroupColumnInput')
    createGroupColumnInput: CreateGroupColumnInput,
  ) {
    return this.groupColumnService.create(createGroupColumnInput);
  }

  // @Mutation(() => GroupBoard, { description: 'Update group board' })
  // updateGroupBoard(
  //   @Args('updateGroupBoardInput')
  //   updateGroupBoardInput: UpdateGroupBoardInput,
  // ) {
  //   return this.groupBoardService.update(updateGroupBoardInput);
  // }
}
