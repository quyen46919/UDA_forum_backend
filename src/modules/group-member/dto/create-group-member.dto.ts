import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class CreateGroupMemberInput {
  @Field(() => String, { nullable: false })
  @IsString({ message: CommonMessage.requiredField('groupId') })
  @MaxLength(36, { message: CommonMessage.maxLength('groupId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('groupId', 6) })
  groupId: string;

  @Field(() => String, { nullable: false })
  @IsString({ message: CommonMessage.requiredField('userId') })
  @MaxLength(36, { message: CommonMessage.maxLength('userId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('userId', 6) })
  userId: string;

  @Field(() => String, {
    nullable: false,
    description: 'format example: 2011-10-05T14:48:00.000Z',
  })
  @IsDateString({ message: CommonMessage.invalidFormatField('joinDate') })
  joinDate: string;
}
