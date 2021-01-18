import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../../users/shemes/user.entity';
import { RegistrationStatus } from '../interfaces/registrationStatus.interface';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UserRO } from '../../users/shemes/users.ro';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(AuthService.name);

  async register(createUserDto: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(createUserDto);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }
  createToken(user: User) {
    const expiresIn = 3600;

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      'CodeBrains',
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }
  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      this.logger.log('password check success');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}