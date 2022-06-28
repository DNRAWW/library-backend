import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ExtendedUserDto } from 'src/modules/user/DTO/extendedUser.dto';
import { UsersService } from 'src/modules/user/services/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  @Inject()
  private readonly usersService: UsersService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    let user: ExtendedUserDto | null = null;

    if (req.body.userId) {
      user = await this.usersService.findOne(<number>req.body.userId);
    } else if (req.params.userId) {
      user = await this.usersService.findOne(<number>req.params.userId);
    }

    if (!user) {
      return false;
    }

    if (!user.isSubscribed) {
      return false;
    }

    return true;
  }
}
