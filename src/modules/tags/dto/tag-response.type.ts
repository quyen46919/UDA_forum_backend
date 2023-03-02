import { ObjectType } from '@nestjs/graphql';
import { Tag } from '../../../entities/tag.entity';
import relayTypes from '../../../shared/types/relay.types';

@ObjectType()
export default class TagResponse extends relayTypes<Tag>(Tag) {}
