import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { HiddenTypes } from 'src/common/enums/hidden.enum';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  createUserId: string;

  @MaxLength(255)
  @Field(() => String)
  title: string;

  @MaxLength(255)
  @Field(() => String)
  content: string;

  @Field(() => String)
  @IsOptional()
  githubLink?: string;

  @Field(() => String)
  isHidden: HiddenTypes = 0;

  @Field(() => [String])
  tags: string[];
}
