import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionTag } from 'src/entities/question-tag.entity';
import { Repository } from 'typeorm';
import { CreateQuestionTagInput } from './dto/create-question-tag.dto';

@Injectable()
export class QuestionTagService {
  constructor(
    @InjectRepository(QuestionTag)
    private questionTagRepository: Repository<QuestionTag>,
  ) {}

  async create(createQuestionTagInput: CreateQuestionTagInput) {
    // this.questionTagRepository.create(createQuestionTagInput);
    return await this.questionTagRepository.save(createQuestionTagInput);
  }
}
