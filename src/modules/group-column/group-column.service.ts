import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/messages';
import { GroupColumn } from 'src/entities/group-columns.entity';
import { Repository } from 'typeorm';
import { GroupBoardService } from '../group-board/group-board.service';
import { CreateGroupColumnInput } from './dto/create-group-column.dto';

@Injectable()
export class GroupColumnService {
  constructor(
    @InjectRepository(GroupColumn)
    private groupColumnService: Repository<GroupColumn>,
    private groupBoardService: GroupBoardService,
  ) {}

  async create(createGroupColumnInput: CreateGroupColumnInput) {
    const board = await this.groupBoardService.findOne(
      createGroupColumnInput.boardId,
    );
    if (!board) {
      throw new BadRequestException(CommonMessage.getMessageInvalidBoard());
    }

    const maxOrder = await this.groupColumnService
      .createQueryBuilder('column')
      .select('MAX(column.order)', 'max')
      .where('column.boardId =:boardId', { boardId: board.id })
      .groupBy('column.boardId')
      .getRawOne();

    console.log('maxOrder', maxOrder);

    return await this.groupColumnService.save({
      ...createGroupColumnInput,
      order: Number(maxOrder?.max) + 1 || 0,
    });
  }

  // async updateOrder(updateColumnOrderInput: UpdateColumnOrderInput) {
  //   const column = await this.groupColumnService.findOneOrFail(
  //     updateColumnOrderInput.id,
  //   );
  //   if (!column) {
  //     throw new BadRequestException(CommonMessage.getMessageInvalidColumn());
  //   }

  //   return 1;
  // }

  // async getMaxOrder() {

  // }
}
