import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClassAttendanceTypes } from '../common/enums/class-attendance.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupMember } from './group-member.entity';
import { Group } from './group.entity';

export interface IGroupAttendance {
  time: string;
  status: ClassAttendanceTypes;
  evidence: string;
}

@Entity({ name: 'group_attendances' })
@ObjectType({ description: 'group_attendances' })
export class GroupAttendance
  extends AbstractEntity
  implements IGroupAttendance
{
  @Field(() => ID)
  id: string;

  @Column({
    name: 'time',
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String)
  time: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    comment: '0: ONLINE | 1: AWAY | 2: DO NOT DISTURB | 3: OFFLINE',
  })
  @Field(() => String, {
    description: '0: ONLINE | 1: AWAY | 2: DO NOT DISTURB | 3: OFFLINE',
    nullable: false,
  })
  status: ClassAttendanceTypes;

  @Column({
    name: 'evidence',
    type: 'varchar',
    length: 36,
  })
  @Field(() => String, {
    nullable: false,
    description: 'Using image or video uuid',
  })
  evidence: string;

  @Field(() => GroupMember)
  @ManyToOne(() => GroupMember, (groupMember) => groupMember.attendances)
  @JoinColumn({ name: 'member_id' })
  member: Promise<GroupMember>;

  @Column({ name: 'member_id', type: 'varchar', length: 36 })
  memberId: string;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.attendances)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;
}
