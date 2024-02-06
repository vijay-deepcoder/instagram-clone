import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@shareable/database/entities';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
