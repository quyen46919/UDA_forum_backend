import { ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/entities/answer.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class AnswerResponse extends relayTypes<Answer>(Answer) {}
