import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { Answer } from 'src/entities/answer.entity';
import { pagingParams } from 'src/shared/agrs/connection.args';
import { AnswerService } from './answer.service';
import AnswerResponse from './dto/answer-response.type';
import { CreateAnswerInput } from './dto/create-answer-input.dto';
import { QuestionAnswerListArg } from './dto/question-answer-list.args';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answerService.create(createAnswerInput);
  }

  @Query(() => AnswerResponse, {
    name: 'answers',
    description: 'Find all answers by question id',
  })
  async findAllByQuestionId(@Args() args: QuestionAnswerListArg) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.answerService.findAllByQuestionId(
      limit,
      offset,
      args.questionId,
    );

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}
