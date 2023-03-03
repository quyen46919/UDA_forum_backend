import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { AbstractEntity } from './abstract.entity';
import { GroupMember } from './group-member.entity';
import { Group } from './group.entity';

export interface IGroupNote {
  title: string;
  content: string;
  category: string;
  color: string;
  isHidden: HiddenTypes;
}

@Entity({ name: 'group_notes' })
@ObjectType({ description: 'group_notes' })
export class GroupNote extends AbstractEntity implements IGroupNote {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
  })
  @Field(() => String)
  title: string;

  @Column({
    name: 'content',
    type: 'longtext',
  })
  @Field(() => String)
  content: string;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 50,
  })
  @Field(() => String)
  category: string;

  @Column({
    name: 'color',
    type: 'varchar',
    length: 20,
  })
  @Field(() => String)
  color: string;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    default: HiddenTypes.FALSE,
    comment: '0: FALSE | 1: TRUE',
  })
  @Field(() => String, { description: '0: FALSE | 1: TRUE -> DEFAULT: FALSE' })
  isHidden: HiddenTypes;

  //relationships
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.notes)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;

  @Field(() => GroupMember)
  @ManyToOne(() => GroupMember, (groupMember) => groupMember.notes)
  @JoinColumn({ name: 'member_id' })
  member: Promise<GroupMember>;

  @Column({ name: 'member_id', type: 'varchar', length: 36 })
  memberId: string;
}
