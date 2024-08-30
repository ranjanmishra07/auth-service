import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, ISingupResponse } from 'src/user/dto/user.dto';
import { UserDocument } from 'src/user/schemas/user.chema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}


  async login(user: CreateUserDto) {
    this.logger.log(`Attempting to log in user with email: ${user.email}`);
    const userResponse = await this.userService.validateUser(user.email, user.password) as UserDocument;
    if (!userResponse) {
      this.logger.warn(`Unauthorized login attempt for email: ${user.email}`);
      throw new UnauthorizedException();
    }
    const payload = { name: user.name, email: user.email, id: userResponse._id.toString()};
    this.logger.log(`User logged in successfully with ID: ${userResponse._id.toString()}`);
    return this.signJwtToken(payload as UserDocument);
  }

   signJwtToken(user: UserDocument) {
    this.logger.log(`Generating JWT for user ID: ${user.id}`);
    const payload = { name: user.name, email: user.email, id: user.id};
    const accessToken = this.jwtService.sign(payload);
    this.logger.log(`JWT generated successfully for user ID: ${user.id}`);
    return {
      accessToken ,
      email: user.email
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<ISingupResponse> {
    this.logger.log(`Attempting to sign up user with email: ${createUserDto.email}`);
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      this.logger.warn(`Signup failed: User with email ${createUserDto.email} already exists`);
      throw new BadRequestException('User with this email already exists');
     }

    // Create a new user
    const user = await this.userService.create(createUserDto);
    this.logger.log(`User signed up successfully with ID: ${user._id.toString()}`);
    
    const payload = { name: user.name, email: user.email, id: user._id.toString()};
    const {accessToken} = this.signJwtToken(payload as UserDocument);
    this.logger.log(`Signup process completed successfully for user ID: ${user._id.toString()}`);
    return { ...payload, accessToken };
  }
}
