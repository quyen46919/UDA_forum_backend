import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ConnectionCursor, ConnectionArguments } from 'graphql-relay';
import { fromGlobalId } from 'graphql-relay/node/node';
import { CustomBadRequestException } from '../exceptions/bad-request.exception';

@ArgsType()
export default class ConnectionArgs implements ConnectionArguments {
  @Field({ nullable: true, description: 'Paginate before opaque cursor' })
  @IsOptional()
  @IsString()
  public before?: ConnectionCursor;

  @Field({ nullable: true, description: 'Paginate after opaque cursor' })
  @IsOptional()
  @IsString()
  public after?: ConnectionCursor;

  @Field({ nullable: true, description: 'Paginate first' })
  @IsNumber({ allowNaN: false })
  public first?: number;

  @Field({ nullable: true, description: 'Paginate last' })
  @IsOptional()
  @IsNumber({ allowNaN: false })
  public last?: number;
}

type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' };

function checkPagingSanity(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, before, after } = args;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!before || !!last;

  if (isForwardPaging && isBackwardPaging) {
    throw new CustomBadRequestException(
      'Relay pagination cannot be forwards AND backwards!',
    );
  }
  if ((isForwardPaging && before) || (isBackwardPaging && after)) {
    throw new CustomBadRequestException(
      'Paging must use either first/after or last/before',
    );
  }
  if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
    throw new CustomBadRequestException('Paging limit must be positive');
  }
  if (last && !before) {
    throw new CustomBadRequestException(
      'When paging backwards, a "before" argument is required!',
    );
  }

  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
    ? { pagingType: 'backward', before, last }
    : { pagingType: 'none' };
}

const getId = (cursor: ConnectionCursor) =>
  parseInt(fromGlobalId(cursor).id, 10);
const nextId = (cursor: ConnectionCursor) => getId(cursor + 1);

function getPagingParameters(args: ConnectionArgs) {
  const meta = checkPagingSanity(args);

  switch (meta.pagingType) {
    case 'forward': {
      return {
        limit: meta.first,
        offset: meta.after ? nextId(meta.after) : 0,
      };
    }
    case 'backward': {
      const { before, last } = meta;
      let limit = last;
      let offset = getId(before) - last;

      if (offset < 0) {
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default: {
      return {};
    }
  }
}

export function pagingParams(args: ConnectionArgs) {
  return getPagingParameters(args);
}
