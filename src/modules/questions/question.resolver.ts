import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { Question } from 'src/entities/question.entity';
import ConnectionArgs, { pagingParams } from 'src/shared/agrs/connection.args';
import { CreateQuestionInput } from './dto/create-question.dto';
import QuestionResponse from './dto/question-response.type';
import { QuestionService } from './question.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Mutation(() => Question, { description: 'Create new question' })
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => QuestionResponse, { name: 'questions' })
  async findAll(@Args() args: ConnectionArgs) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.questionService.findAll(limit, offset);

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}
