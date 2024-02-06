import { Injectable } from '@nestjs/common';

import { HashService } from '@core/hashing/hash.service';
import { JwtService } from '@core/jwt/jwt.service';
import { ApiException, ErrorCodes } from '@core/exception';
import { LoginReqDto, RegisterReqDto } from './dtos';
import { UserRepository } from '@shareable/database/repository';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(body: LoginReqDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (user) {
      user.isActiveCheck();
      const passwordMatched = await this.hashService.compare(
        body.password,
        user.password,
      );
      if (passwordMatched) {
        return {
          user: user,
          token: await this.jwtService.token({
            id: user.id,
            email: user.email,
          }),
        };
      }
    }
    throw new ApiException(ErrorCodes.BadRequest);
  }

  async register(body: RegisterReqDto) {
    await this.userRepository.isUniqueUserName(body.username);
    await this.userRepository.isUniqueMail(body.email);
    const user = await this.userRepository.create({
      ...body,
      password: await this.hashService.hash(body.password),
    });
    await this.userRepository.save(user);
    return {
      user: user,
      token: await this.jwtService.token({
        id: user.id,
        email: user.email,
      }),
    };
  }

  forgotPassword() {
    return 'forgot password';
  }

  resetPassword() {
    return 'reset password';
  }
}
