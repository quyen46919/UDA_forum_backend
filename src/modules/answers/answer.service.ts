import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer-input.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const maxCount = await this.answerRepository
      .createQueryBuilder('answer')
      .select('MAX(answer.count)', 'max')
      .getRawOne();

    return this.answerRepository.save({
      ...createAnswerInput,
      count: maxCount?.max + 1 || 1,
    });
  }

  async findAllByQuestionId(
    limit: number,
    offset: number,
    questionId: string,
  ): Promise<[Answer[], number]> {
    return await this.answerRepository.findAndCount({
      where: {
        questionId: questionId,
      },
      take: limit,
      skip: offset,
    });
  }
}
