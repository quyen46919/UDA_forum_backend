import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { GroupMember } from 'src/entities/group-member.entity';
import ConnectionArgs, { pagingParams } from 'src/shared/agrs/connection.args';
import { CreateGroupMemberInput } from './dto/create-group-member.dto';
import GroupMemberResponse from './dto/question-response.type';
import { UpdateGroupMemberRoleInput } from './dto/update-group-member-role.dto';
import { GroupMemberService } from './group-member.service';

@Resolver(() => GroupMember)
export class GroupMemberResolver {
  constructor(private groupMemberService: GroupMemberService) {}

  @Query(() => GroupMemberResponse, { name: 'groupMembers' })
  async findAll(@Args() args: ConnectionArgs) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.groupMemberService.findAll(limit, offset);

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Mutation(() => GroupMember, { description: 'Create group member' })
  createGroupMember(
    @Args('createGroupMemberInput')
    createGroupMemberInput: CreateGroupMemberInput,
  ) {
    return this.groupMemberService.create(createGroupMemberInput);
  }

  @Mutation(() => GroupMember, { description: 'Update group member role' })
  updateGroupMemberRole(
    @Args('updateGroupMemberRoleInput')
    updateGroupMemberRoleInput: UpdateGroupMemberRoleInput,
  ) {
    return this.groupMemberService.update(updateGroupMemberRoleInput);
  }

  @Mutation(() => GroupMember, { description: 'Soft remove group member' })
  removeGroupMember(
    @Args('groupMemberId')
    groupMemberId: string,
  ) {
    return this.groupMemberService.remove(groupMemberId);
  }
}
