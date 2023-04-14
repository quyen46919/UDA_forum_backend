import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/messages';
import { GroupBoard } from 'src/entities/group-board.entity';
import { Repository } from 'typeorm';
import { GroupService } from '../groups/group.service';
import { CreateGroupBoardInput } from './dto/create-group-board.dto';
import { UpdateGroupBoardInput } from './dto/update-group-board.dto';

@Injectable()
export class GroupBoardService {
  constructor(
    @InjectRepository(GroupBoard)
    private groupBoardRepository: Repository<GroupBoard>,
    private groupService: GroupService,
  ) {}

  async findAllChildOnBoard(
    limit: number,
    offset: number,
    groupId: string,
  ): Promise<[GroupBoard[], number]> {
    return await this.groupBoardRepository.findAndCount({
      where: {
        groupId: groupId,
      },
      take: limit,
      skip: offset,
    });
  }

  async create(createGroupBoardInput: CreateGroupBoardInput) {
    const group = await this.groupService.findOne(
      createGroupBoardInput.groupId,
    );

    if (!group) {
      throw new BadRequestException(CommonMessage.getMessageInvalidGroup());
    }

    const { color, groupId, title } = createGroupBoardInput;
    const isDuplicateName = await this.checkUniqeGroupTitle(title);

    if (isDuplicateName) {
      throw new BadRequestException(
        CommonMessage.getMessageDuplicateGroupName(),
      );
    }

    return await this.groupBoardRepository.save({
      groupId: groupId,
      color: color,
      title: title,
    });
  }

  async update(updateGroupBoardInput: UpdateGroupBoardInput) {
    const groupBoard = this.groupBoardRepository.findOne(
      updateGroupBoardInput.id,
    );
    if (!groupBoard) {
      throw new BadRequestException(CommonMessage.getMessageInvalidGroup());
    }
    const { id, color, title } = updateGroupBoardInput;
    const isDuplicateName = await this.checkUniqeGroupTitle(title);

    if (isDuplicateName) {
      throw new BadRequestException(
        CommonMessage.getMessageDuplicateGroupName(),
      );
    }

    await this.groupBoardRepository.update(id, { color, title });
    return await this.groupBoardRepository.findOne(id);
  }

  async checkUniqeGroupTitle(title: string) {
    const rs = await this.groupBoardRepository.findOne({
      where: { title: title },
    });
    return !!rs;
  }

  async findOne(id: string) {
    return await this.groupBoardRepository.findOne(id);
  }
}
