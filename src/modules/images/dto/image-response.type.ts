import { Field, ObjectType } from '@nestjs/graphql';
import { Image } from 'src/entities/image.entity';

@ObjectType()
export class ImageResponseType {
  @Field(() => Boolean)
  uploadFile: boolean;

  @Field()
  name: string;

  @Field(() => Image)
  image: Image;
}
