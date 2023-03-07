import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class CreateGroupInput {
  @Field(() => String, { nullable: true })
  @MaxLength(36, { message: CommonMessage.maxLength('userId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('userId', 6) })
  @IsOptional() // remove it in the future
  courseId?: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MaxLength(10, { message: CommonMessage.maxLength('name', 10) })
  @MinLength(5, { message: CommonMessage.minLength('name', 5) })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => String, { nullable: false })
  @IsString()
  logo: string;

  @Field(() => String, { nullable: false })
  @IsString()
  meetingLink: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  subMeetingLink?: string;
}
