import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { GroupAttendance } from 'src/entities/group-attendance.entity';
import ConnectionArgs, { pagingParams } from 'src/shared/agrs/connection.args';
import DuringAgrs from 'src/shared/agrs/during.args';
import { CreateAttendanceInput } from './dto/create-attendance.dto';
import GroupAttendanceResponse from './dto/group-attendance-response.type';
import { GroupAttendanceService } from './group-attendance.service';

@Resolver(() => GroupAttendance)
export class GroupAttendanceResolver {
  constructor(private groupAttendanceService: GroupAttendanceService) {}

  @Query(() => GroupAttendanceResponse, { name: 'groupAttendances' })
  async findAll(@Args() args: ConnectionArgs, @Args() during: DuringAgrs) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.groupAttendanceService.findAll(
      limit,
      offset,
      during?.startTime,
      during?.endTime,
    );

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Mutation(() => GroupAttendance, {
    description: 'create class attendance with evidence',
  })
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ) {
    return this.groupAttendanceService.create(createAttendanceInput);
  }
}
