import { UserRole } from '@core/types/user.role.types';

export interface RequestUser {
  id: string;
  role: UserRole;
}
