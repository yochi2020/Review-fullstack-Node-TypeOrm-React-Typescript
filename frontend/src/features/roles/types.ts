export type Permission = {
  id: number;
  name: string;
};

export type Role = {
  id: number;
  name: string;
  permissions?: Permission[];
};

export type RolePayload = {
  name: string;
  permission: number[];
};
