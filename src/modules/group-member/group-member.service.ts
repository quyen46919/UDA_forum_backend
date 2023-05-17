import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMemberRoles } from 'src/common/enums/group-member-role.enum';
import { CommonMessage } from 'src/common/messages';
import { GroupMember } from 'src/entities/group-member.entity';
import { IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { CreateGroupMemberInput } from './dto/create-group-member.dto';
import { UpdateGroupMemberRoleInput } from './dto/update-group-member-role.dto';

@Injectable()
export class GroupMemberService {
  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
  ) {}

  async findAll(
    limit: number,
    offset: number,
  ): Promise<[GroupMember[], number]> {
    return await this.groupMemberRepository.findAndCount({
      where: {
        outDate: IsNull(),
      },
      take: limit,
      skip: offset,
    });
  }

  async create(createGroupMemberInput: CreateGroupMemberInput) {
    // Nếu có member và outDate = null thì member đang tồn tại trong group
    const member = await this.groupMemberRepository.findOne({
      userId: createGroupMemberInput.userId,
      outDate: IsNull(),
    });
    if (member) {
      throw new BadRequestException(CommonMessage.getMessageExistedMember());
    }

    // Nếu có member đã out thì cập nhật lại outDate
    const leftMember = await this.groupMemberRepository.findOne({
      userId: createGroupMemberInput.userId,
      outDate: Not(IsNull()),
    });

    if (leftMember && leftMember?.outDate) {
      const rs = await this.groupMemberRepository.update(leftMember.id, {
        outDate: null,
      });
      return await this.handleUpdateResult(leftMember.id, rs);
    }

    return await this.groupMemberRepository.save({
      ...createGroupMemberInput,
      role: GroupMemberRoles.MEMBER,
    });
  }

  async update(updateGroupMemberRoleInput: UpdateGroupMemberRoleInput) {
    const member = await this.groupMemberRepository.findOne({
      id: updateGroupMemberRoleInput.id,
      outDate: IsNull(),
    });

    if (!member) {
      throw new BadRequestException(CommonMessage.getMessageInvalidMember());
    }

    const rs = await this.groupMemberRepository.update(member.id, {
      role: updateGroupMemberRoleInput.role,
    });
    return await this.handleUpdateResult(member.id, rs);
  }

  async remove(memberId: string) {
    const member = await this.groupMemberRepository.findOneOrFail(memberId);

    if (!member || member.outDate) {
      throw new BadRequestException(CommonMessage.getMessageInvalidMember());
    }

    const rs = await this.groupMemberRepository.update(member.id, {
      outDate: new Date().toISOString(),
    });
    return await this.handleUpdateResult(member.id, rs);
  }

  handleUpdateResult = async (id: string, rs: UpdateResult) => {
    if (rs.affected === 1) {
      return await this.groupMemberRepository.findOne(id);
    } else {
      throw new BadRequestException(CommonMessage.getMessageUpdateFailed());
    }
  };
}
