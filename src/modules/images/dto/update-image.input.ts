import { CreateImageInput } from './create-image.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {
  @Field()
  id: string;
}
