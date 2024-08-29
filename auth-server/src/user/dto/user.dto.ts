import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'ranajn@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password@123**',
  })
  @IsString()
  @MinLength(8)
  @Matches(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
  @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
  @Matches(/.*\W.*/, { message: 'Password must contain at least one special character' })
  password: string;
}

export interface ISingupResponse {
    id: string;
    name: string;
    email: string;
    accessToken: string;
}