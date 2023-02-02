import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag-input.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll(limit: number, offset: number): Promise<[Tag[], number]> {
    return await this.tagRepository.findAndCount({
      take: limit,
      skip: offset,
    });
  }

  async create(CreateTagInput: CreateTagInput) {
    return this.tagRepository.save(CreateTagInput);
  }
}
