import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthTypeEnum } from '@core/enum/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { ApiException, ErrorCodes } from '@core/exception';
import { JwtInterface } from '../interface';
import { JwtService } from '@core/jwt/jwt.service';
import { UserRepository } from '@shareable/database/repository';

@Injectable()
export class UserGuard implements CanActivate {
  private readonly defaultAuthType = AuthTypeEnum.Bearer;

  constructor(
    private reflector: Reflector,
    private readonly tokenService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guards = this.reflector.getAllAndOverride('authType', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [this.defaultAuthType];
    for (const guard of guards as AuthTypeEnum[]) {
      if (guard === AuthTypeEnum.Bearer) {
        return this.BearerValidation(context);
      }
    }
    return true;
  }

  protected async BearerValidation(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const decode: JwtInterface = await this.tokenService.decodeFromHeader(
      request,
    );
    const user = await this.userRepository.findOneBy({
      id: decode.id,
    });
    if (user) {
      user.isActiveCheck();
      request.user = user;
      return true;
    }
    throw new ApiException(ErrorCodes.LoginRequired);
  }
}
