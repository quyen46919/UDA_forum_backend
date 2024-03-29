import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GroupMemberRoles } from '../common/enums/group-member-role.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Group } from './group.entity';
import { User } from './user.entity';
import { GroupAttendance } from './group-attendance.entity';
import { GroupEvent } from './group-event.entity';
import { GroupNote } from './group-note.entity';

export interface IGroupMember {
  joinDate: string;
  outDate?: string;
  role: GroupMemberRoles;
}

@Entity({ name: 'group_members' })
@ObjectType({ description: 'group_members' })
export class GroupMember extends AbstractEntity implements IGroupMember {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'joinDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String)
  joinDate: string;

  @Column({
    name: 'outDate',
    type: 'timestamp',
    default: null,
  })
  @Field(() => String)
  outDate?: string;

  @Column({
    name: 'role',
    type: 'tinyint',
    default: GroupMemberRoles.MEMBER,
    comment: '0: ADMIN | 1: SUBADMIN | 2: MEMBER',
  })
  @Field(() => Int, { description: '0: ADMIN | 1: SUBADMIN | 2: MEMBER' })
  role: GroupMemberRoles;

  // relationships
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.group)
  @JoinColumn({ name: 'user_id' })
  users: Promise<User>;

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId: string;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;

  @Field(() => GroupAttendance)
  @OneToMany(() => GroupAttendance, (groupAttendance) => groupAttendance.member)
  attendances: Promise<GroupAttendance>;

  @Field(() => GroupEvent)
  @OneToMany(() => GroupEvent, (groupEvent) => groupEvent.member)
  events: Promise<GroupEvent>;

  @Field(() => GroupNote)
  @OneToMany(() => GroupNote, (groupNote) => groupNote.member)
  notes: Promise<GroupNote>;
}
