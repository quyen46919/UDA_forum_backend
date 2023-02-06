import { ObjectType } from '@nestjs/graphql';
import { Question } from 'src/entities/question.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class QuestionResponse extends relayTypes<Question>(Question) {}
