export class User {
  id?: number;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName?: string;
  password?: string;
  gender: string | undefined;
  image?: string;
  birthday: number | undefined;
  role?: 'admin' | 'user';
}

export type Users = User[];
