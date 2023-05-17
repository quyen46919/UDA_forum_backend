import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class UpdateGroupBoardInput {
  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('id', 36) })
  @MinLength(6, { message: CommonMessage.minLength('id', 6) })
  id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(6, { message: CommonMessage.minLength('title', 6) })
  title: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(4, { message: CommonMessage.minLength('color', 4) })
  color: string;
}
