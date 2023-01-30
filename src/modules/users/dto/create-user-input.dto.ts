import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';
import { CommonMessage } from 'src/common/messages';

@InputType()
export class CreateUserInput {
  @MaxLength(50, {
    message: CommonMessage.getMessageMaxLength('Họ tên', '50'),
  })
  @Field(() => String)
  fullName: string;

  @IsEmail({}, { message: CommonMessage.getMessageEmailInvalid() })
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
