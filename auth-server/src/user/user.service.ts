import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.chema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection

  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    this.logger.log(`User created with ID: ${user._id.toString()}`);

    return user.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log(`User validated successfully: ${user._id}`);
      return user;
    }
    this.logger.warn(`User validation failed for email: ${email}`);
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    return this.userModel.findOne({ email });
  }
}

