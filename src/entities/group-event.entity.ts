import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EventTypes } from '../common/enums/event.enum';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { AbstractEntity } from './abstract.entity';
import { GroupMember } from './group-member.entity';
import { Group } from './group.entity';

export class IGroupEvent {
  name: string;
  description: string;
  meetingUrl: string;
  startTime: string;
  endTime: string;
  isHidden: HiddenTypes;
  type: EventTypes;
  color: string;
}

@Entity({ name: 'group_events' })
@ObjectType({ description: 'group_events' })
export class GroupEvent extends AbstractEntity implements IGroupEvent {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  @Field(() => String)
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
  })
  @Field(() => String)
  description: string;

  @Column({
    name: 'meeting_url',
    type: 'varchar',
    length: 200,
  })
  @Field(() => String)
  meetingUrl: string;

  @Column({
    name: 'start_time',
    type: 'timestamp',
    default: null,
  })
  @Field(() => String)
  startTime: string;

  @Column({
    name: 'end_time',
    type: 'timestamp',
    default: null,
  })
  @Field(() => String)
  endTime: string;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
    default: HiddenTypes.FALSE,
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE -> DEFAULT: FALSE' })
  isHidden: HiddenTypes;

  @Column({
    name: 'type',
    type: 'tinyint',
    comment: '0: EVENT | 1: TODO | 2: ANNOUCEMENT',
    default: EventTypes.EVENT,
  })
  @Field(() => Int, {
    description: '0: EVENT | 1: TODO | 2: ANNOUCEMENT -> DEFAULT: EVENT',
  })
  type: EventTypes;

  @Column({
    name: 'color',
    type: 'varchar',
    length: 20,
  })
  @Field(() => String)
  color: string;

  // relationships
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.events)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;

  @Field(() => GroupMember)
  @ManyToOne(() => GroupMember, (groupMember) => groupMember.events)
  @JoinColumn({ name: 'member_id' })
  member: Promise<GroupMember>;

  @Column({ name: 'member_id', type: 'varchar', length: 36 })
  memberId: string;
}
