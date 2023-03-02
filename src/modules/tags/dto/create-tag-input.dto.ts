import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  logo: string;

  @Field(() => String)
  description: string;
}
