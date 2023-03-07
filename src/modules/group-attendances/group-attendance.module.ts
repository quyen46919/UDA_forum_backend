import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupAttendance } from 'src/entities/group-attendance.entity';
import { GroupAttendanceResolver } from './group-attendance.resolver';
import { GroupAttendanceService } from './group-attendance.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupAttendance])],
  providers: [GroupAttendanceResolver, GroupAttendanceService],
  exports: [GroupAttendanceService],
})
export class GroupAttendanceModule {}
