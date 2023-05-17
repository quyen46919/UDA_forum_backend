import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupCard } from 'src/entities/group-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupCardService {
  constructor(
    @InjectRepository(GroupCard)
    private groupCardService: Repository<GroupCard>,
  ) {}

  async create() {
    return 1;
  }
}
