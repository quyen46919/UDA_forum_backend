import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export default class DuringAgrs {
  @Field({ nullable: true, description: 'Start time of search' })
  @IsOptional()
  @IsString()
  public startTime?: string;

  @Field({ nullable: true, description: 'End time of search' })
  @IsOptional()
  @IsString()
  public endTime?: string;
}
