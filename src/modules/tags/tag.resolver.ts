import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { Tag } from 'src/entities/tag.entity';
import ConnectionArgs, { pagingParams } from 'src/shared/agrs/connection.args';
import { CreateTagInput } from './dto/create-tag-input.dto';
import TagResponse from './dto/tag-response.type';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => TagResponse, { name: 'tags' })
  async findAll(@Args() args: ConnectionArgs) {
    const { limit, offset } = pagingParams(args);
    const [tags, count] = await this.tagService.findAll(limit, offset);

    const page = connectionFromArraySlice(tags, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Mutation(() => Tag, { description: 'Create tag' })
  createTag(@Args('createTagInput') createUserInput: CreateTagInput) {
    return this.tagService.create(createUserInput);
  }
}
