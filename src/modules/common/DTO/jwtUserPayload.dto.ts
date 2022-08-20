import { Roles } from '../../user/entities/user.entity';

export class JwtUserPayloadDto {
  userId: number;
  role: Roles;
  email: string;
}
