import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard.ts';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get a hello message' })
  @ApiResponse({ status: 200, description: 'Returns a hello message.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getHello(): string {
    return this.appService.getHello();
  }
}