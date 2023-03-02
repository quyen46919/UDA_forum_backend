import { Resolver } from '@nestjs/graphql';
import { QuestionTag } from 'src/entities/question-tag.entity';
import { QuestionTagService } from './question-tag.service';

@Resolver(() => QuestionTag)
export class QuestionTagResolver {
  constructor(private questionTagService: QuestionTagService) {}
}
