import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/messages';
import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';
import { CustomBadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { getConnection, Repository } from 'typeorm';
import { QuestionTagService } from '../question-tags/question-tag.service';
import { UserService } from '../users/user.service';
import { CreateQuestionInput } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private userService: UserService,
    private questionTagService: QuestionTagService,
  ) {}

  async create(createQuestionInput: CreateQuestionInput) {
    const maxCount = await this.questionRepository
      .createQueryBuilder('question')
      .select('MAX(question.count)', 'max')
      .getRawOne();

    let user: User;
    try {
      user = await this.userService.findOneById(
        createQuestionInput.createUserId,
      );
    } catch (err) {
      throw new CustomBadRequestException(
        CommonMessage.getMessageInvalidAccount(),
      );
    }

    const question = {
      user,
      title: createQuestionInput.title,
      content: createQuestionInput.content,
      isHidden: createQuestionInput.isHidden,
      githubLink: createQuestionInput.githubLink || '',
      count: maxCount?.max + 1 || 1,
    };

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    const newQuestion = this.questionRepository.create(question);
    const currentQuestion = await this.questionRepository.save(newQuestion);
    try {
      for (const tag of createQuestionInput.tags) {
        await this.questionTagService.create({
          tagId: tag,
          questionId: currentQuestion.id,
        });
      }
      await queryRunner.commitTransaction();
      return currentQuestion;
    } catch (err) {
      await queryRunner.manager.delete(Question, currentQuestion);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(limit: number, offset: number): Promise<[Question[], number]> {
    return await this.questionRepository.findAndCount({
      take: limit,
      skip: offset,
    });
  }
}
