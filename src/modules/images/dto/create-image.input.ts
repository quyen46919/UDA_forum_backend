import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  alt: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  urlLink?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  blurHash?: string;

  @Field(() => ID)
  createUserId: string;
}
