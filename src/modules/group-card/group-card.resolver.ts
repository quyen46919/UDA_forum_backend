import { Resolver } from '@nestjs/graphql';
import { GroupCard } from 'src/entities/group-card.entity';
import { GroupCardService } from './group-card.service';

@Resolver(() => GroupCard)
export class GroupCardResolver {
  constructor(private groupCardService: GroupCardService) {}
}
