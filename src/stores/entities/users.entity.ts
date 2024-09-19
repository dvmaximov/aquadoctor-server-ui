export class User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  password?: string;
  gender?: string;
  image?: string;
  birthday?: number;
  role?: 'admin' | 'user';
  active?: number;
}

export type Users = User[];
