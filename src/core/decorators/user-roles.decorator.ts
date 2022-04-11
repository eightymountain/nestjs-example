import { UserRole } from '@core/types/user.role.types';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
