import { ObjectType } from '@nestjs/graphql';
import { GroupAttendance } from 'src/entities/group-attendance.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class GroupAttendanceResponse extends relayTypes<GroupAttendance>(
  GroupAttendance,
) {}
