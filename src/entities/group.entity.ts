import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupAttendance } from './group-attendance.entity';
import { GroupBoard } from './group-board.entity';
import { GroupEvent } from './group-event.entity';
import { GroupMember } from './group-member.entity';
import { GroupNote } from './group-note.entity';
import { GroupQuickQuestion } from './group-quick-question.entity';

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
  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Column({
    name: 'logo',
  })
  @Field(() => String)
  logo: string;

  @Column({
    name: 'qr_code',
    default: null,
  })
  @Field(() => String, { nullable: true })
  qrCode?: string;

  @Column({
    name: 'invite_code',
    length: 255,
    default: null,
  })
  @Field(() => String, { nullable: true })
  inviteCode?: string;

  @Column({
    name: 'meeting_link',
    length: 255,
  })
  @Field(() => String)
  meetingLink: string;

  @Column({
    name: 'sub_meeting_link',
    length: 255,
    default: null,
  })
  @Field(() => String, { nullable: true })
  subMeetingLink?: string;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  // relationships
  @Field(() => GroupMember)
  @OneToMany(() => GroupMember, (groupMember) => groupMember.group)
  users: Promise<GroupMember[]>;

  @Field(() => GroupAttendance)
  @OneToMany(() => GroupAttendance, (groupAttendance) => groupAttendance.group)
  attendances: Promise<GroupAttendance[]>;

  @Field(() => GroupBoard)
  @OneToMany(() => GroupBoard, (groupBoard) => groupBoard.group)
  boards: Promise<GroupBoard[]>;

  @Field(() => GroupNote)
  @OneToMany(() => GroupNote, (groupNote) => groupNote.group)
  notes: Promise<GroupNote[]>;

  @Field(() => GroupEvent)
  @OneToMany(() => GroupEvent, (groupNote) => groupNote.group)
  events: Promise<GroupEvent[]>;

  @Field(() => GroupQuickQuestion)
  @OneToMany(
    () => GroupQuickQuestion,
    (GroupQuickQuestion) => GroupQuickQuestion.group,
  )
  quickQuestions: Promise<GroupQuickQuestion[]>;
}
