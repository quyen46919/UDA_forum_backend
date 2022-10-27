import { GenderTypes } from 'src/common/enums/gender.enum';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  gender: GenderTypes;
}

@Entity({ name: 'users' })
export class User extends AbstractEntity implements UserInterface {
  id: string;

  @Column({
    name: 'first_name',
    length: 50,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 50,
  })
  lastName: string;

  @Column({
    name: 'email',
    length: 50,
  })
  email: string;

  @Column({
    name: 'avatar_url',
    length: 50,
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    name: 'banner_url',
    length: 50,
    nullable: true,
  })
  bannerUrl: string;

  @Column({
    name: 'gender',
    length: 50,
  })
  gender: GenderTypes;
}
