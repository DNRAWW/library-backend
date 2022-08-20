import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';
import { JwtUserPayloadDto } from 'src/modules/common/DTO/jwtUserPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password == password) {
      return user;
    }

    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtUserPayloadDto = {
      userId: user.id,
      role: user.role,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
