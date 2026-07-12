export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: number;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: {
    id: number;
  };
  isActive?: boolean;
}
