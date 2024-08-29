import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        access_token: 'string',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signIn(@Request() req): Promise<{ accessToken: string; email: string }> {
    const user: CreateUserDto = req.body;
    return this.authService.login(user);
  }
}
