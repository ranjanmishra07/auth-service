import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, ISingupResponse } from 'src/user/dto/user.dto';
import { UserDocument } from 'src/user/schemas/user.chema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}


  async login(user: CreateUserDto) {
    const userResponse = await this.userService.validateUser(user.email, user.password) as UserDocument;
    if (!userResponse) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name, email: user.email, id: userResponse._id.toString()};
    return this.signJwtToken(payload as UserDocument);
  }

   signJwtToken(user: UserDocument) {
    const payload = { name: user.name, email: user.email, id: user.id};
    return {
      accessToken: this.jwtService.sign(payload),
      email: user.email
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<ISingupResponse> {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
     }

    // Create a new user
    const user = await this.userService.create(createUserDto);
    
    const payload = { name: user.name, email: user.email, id: user._id.toString()};
    const {accessToken} = this.signJwtToken(payload as UserDocument);
    return { ...payload, accessToken };
  }
}
