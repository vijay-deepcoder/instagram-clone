import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from '@core/response.interceptor';
import { LoginReqDto, LoginResDto, RegisterReqDto } from './dtos';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'this api will use for user login',
  })
  @ApiBadRequestResponse({
    description: 'invalid credentials',
  })
  @Response(LoginResDto)
  @ApiOkResponse({
    type: LoginResDto,
  })
  login(@Body() body: LoginReqDto) {
    return this.authService.login(body);
  }
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'this api will use for user registration',
  })
  @Response(LoginResDto)
  @ApiOkResponse({
    type: LoginResDto,
  })
  register(@Body() body: RegisterReqDto) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword() {
    return this.authService.forgotPassword();
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword() {
    return this.authService.resetPassword();
  }
}
