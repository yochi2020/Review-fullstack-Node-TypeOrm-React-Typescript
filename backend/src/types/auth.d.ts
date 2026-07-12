export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  role: {
    id: number;
  };
}

export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UpdateUserData {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: {
    id: number;
  };
  isActive?: boolean;
}
