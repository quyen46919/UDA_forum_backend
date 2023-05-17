import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from 'src/entities/group.entity';
import { CreateGroupInput } from './dto/create-group.dto';
import { GroupService } from './group.service';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  @Mutation(() => Group, { description: 'Create group' })
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }
}
