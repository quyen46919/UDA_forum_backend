import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { GroupAttendance } from 'src/entities/group-attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.dto';

@Injectable()
export class GroupAttendanceService {
  constructor(
    @InjectRepository(GroupAttendance)
    private groupAttendanceRepository: Repository<GroupAttendance>,
  ) {}

  async create(createAttendanceInput: CreateAttendanceInput) {
    return this.groupAttendanceRepository.save(createAttendanceInput);
  }

  async findAll(
    limit: number,
    offset: number,
    startTime: string,
    endTime: string,
  ): Promise<[GroupAttendance[], number]> {
    const conditions = [];
    if (startTime && endTime) {
      conditions.push({
        time: Raw(
          (alias) => `${alias} >= :startTime AND ${alias} <= :endTime`,
          {
            startTime: startTime,
            endTime: endTime,
          },
        ),
      });
    } else {
      if (startTime) {
        conditions.push({
          time: Raw((alias) => `${alias} >= :startTime`, {
            startTime: startTime,
          }),
        });
      }
      if (endTime) {
        conditions.push({
          time: Raw((alias) => `${alias} <= :endTime`, {
            endTime: endTime,
          }),
        });
      }
    }

    return await this.groupAttendanceRepository.findAndCount({
      ...(conditions.length > 0 && { where: conditions }),
      take: limit,
      skip: offset,
    });
  }
}
