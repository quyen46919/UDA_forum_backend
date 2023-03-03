import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupMember } from './group-member.entity';
import { Group } from './group.entity';

export interface IGroupAttendance {
  time: string;
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String)
  time: string;

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
