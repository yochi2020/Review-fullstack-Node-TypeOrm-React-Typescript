export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateCurrentUserProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UpdateCurrentUserPasswordDto {
  password: string;
  password_confirm: string;
}
