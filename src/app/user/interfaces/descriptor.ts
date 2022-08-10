export interface NewUser {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  avatar: File;
  // avatar: string;
}

export interface existingUser {
  email: string;
  password: string;
}

export interface LoggedUser {
  refresh: string;
  access: string;
  id: number;
  name: string;
  isAdmin: boolean;
  token: string;
  password: string;
  last_login: unknown;
  is_superuser: boolean;
  email: string;
  first_name: string;
  last_name: string;
  avatar: File;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: Date;
  groups: [];
  user_permissions: [];
}

export interface BridgeUser {
  id: number;
  email: string;
  token: string;
  expiresIn: number;
  first_name: string;
  last_name: string;
}
