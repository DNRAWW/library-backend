import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/modules/user/services/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  @Inject()
  private readonly usersService: UsersService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
