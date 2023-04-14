import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, MaxLength, Min, MinLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class UpdateColumnOrderInput {
  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('id', 36) })
  @MinLength(6, { message: CommonMessage.minLength('id', 6) })
  id: string;

  @Field(() => Int, { nullable: false })
  @IsInt()
  @Min(0)
  oldOrder: number;

  @Field(() => Int, { nullable: false })
  @IsInt()
  @Min(0)
  newOrder: number;
}
