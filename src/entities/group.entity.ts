import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupAttendance } from './group-attendance.entity';
import { GroupBoard } from './group-board.entity';
import { GroupMember } from './group-member.entity';

export interface IGroup {
  name: string;
  imageUrl?: string;
  logo: string;
  qrCode?: string;
  inviteCode?: string;
  meetingLink: string;
  subMeetingLink?: string;
}

@Entity({ name: 'groups' })
@ObjectType({ description: 'groups' })
export class Group extends AbstractEntity implements IGroup {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    length: 100,
  })
  @Field(() => String)
  name: string;

  @Column({
    name: 'image_url',
  })
  @Field(() => String)
  imageUrl?: string;

  @Column({
    name: 'logo',
  })
  @Field(() => String)
  logo: string;

  @Column({
    name: 'qr_code',
  })
  @Field(() => String)
  qrCode?: string;

  @Column({
    name: 'invite_code',
    length: 255,
  })
  @Field(() => String)
  inviteCode: string;

  @Column({
    name: 'meeting_link',
    length: 255,
  })
  @Field(() => String)
  meetingLink: string;

  @Column({
    name: 'sub_meeting_link',
    length: 255,
  })
  @Field(() => String)
  subMeetingLink: string;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  // relationships
  @Field(() => GroupMember)
  @OneToMany(() => GroupMember, (groupMember) => groupMember.users)
  users: Promise<GroupMember>;

  @Field(() => GroupAttendance)
  @OneToMany(() => GroupAttendance, (groupAttendance) => groupAttendance.group)
  attendances: Promise<GroupAttendance>;

  @Field(() => GroupBoard)
  @OneToMany(() => GroupBoard, (groupBoard) => groupBoard.group)
  boards: Promise<GroupBoard>;
}
