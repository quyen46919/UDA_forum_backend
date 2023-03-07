import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { GroupMemberRoles } from 'src/common/enums/group-member-role.enum';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class UpdateGroupMemberRoleInput {
  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('id', 36) })
  @MinLength(6, { message: CommonMessage.minLength('id', 6) })
  id: string;

  @Field(() => Int, {
    nullable: false,
    description: '0: ADMIN | 1: SUBADMIN | 2: MEMBER',
  })
  @Min(0)
  @Max(2)
  role: GroupMemberRoles;
}
