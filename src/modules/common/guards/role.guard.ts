import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../user/entities/user.entity';

export const RequireRole = (role: Roles) => SetMetadata('requiredRole', role);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();

    const requiredRole = this.reflector.get<Roles | null>(
      'requiredRole',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    if (!req.user) {
      return false;
    }

    if (requiredRole !== req.user.role && req.user.role !== Roles.ADMIN) {
      return false;
    }

    return true;
  }
}
