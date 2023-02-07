import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

export interface ImageInterface {
  name: string;
  alt: string;
  description?: string;
  blurHash?: string;
  urlLink?: string;
}

@Entity({ name: 'images' })
@ObjectType({ description: 'Images' })
export class Image extends AbstractEntity implements ImageInterface {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    length: 255,
  })
  @Field()
  name: string;

  @Column({
    name: 'alt',
    length: 255,
  })
  @Field()
  alt: string;

  @Column({
    name: 'description',
    length: 255,
    default: '',
  })
  @Field()
  description?: string;

  @Column({
    name: 'blur_hash',
    length: 255,
    default: '',
  })
  @Field()
  blurHash?: string;

  @Column({
    name: 'url_link',
    length: 255,
    default: '',
  })
  @Field()
  urlLink?: string;

  @Field(() => User)
  @ManyToOne(() => User, (question) => question.images)
  @JoinColumn({ name: 'create_user_id' })
  user: Promise<User>;

  @Column({ name: 'create_user_id', type: 'varchar', length: 36 })
  createUserId: string;
}
