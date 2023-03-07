import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ClassAttendanceTypes } from 'src/common/enums/class-attendance.enum';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class CreateAttendanceInput {
  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('memberId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('memberId', 6) })
  memberId: string;

  @Field(() => String, { nullable: false })
  @MaxLength(36, { message: CommonMessage.maxLength('groupId', 36) })
  @MinLength(6, { message: CommonMessage.minLength('groupId', 6) })
  groupId: string;

  @Field(() => String, {
    nullable: false,
    description: 'format example: 2011-10-05T14:48:00.000Z',
  })
  @IsDateString({ message: CommonMessage.invalidFormatField('time') })
  time: string;

  @Field(() => Int, { nullable: false })
  @IsInt()
  @Min(0)
  @Max(3)
  status: ClassAttendanceTypes;

  @Field(() => String, { nullable: false })
  @IsString()
  @MaxLength(36, { message: CommonMessage.maxLength('evidence', 36) })
  @MinLength(6, { message: CommonMessage.minLength('evidence', 6) })
  evidence: string;
}
