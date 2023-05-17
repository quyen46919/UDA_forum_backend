import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class CreateGroupColumnInput {
  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('boardId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('boardId', 6) })
  boardId: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(6, { message: CommonMessage.minLength('title', 6) })
  title: string;
}
