export interface IUsers {
  id: string;
  name: string;
  email: string;
  telephone: string | null;
  birth_date: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
}
export interface IRequestCreateUser {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  birthDate: string;
}

export interface ICreateUser {
  id: string;
  name: string;
  email: string;
  telephone: string;
  birthDate: string;
  password: string;
}

export interface IRequestUpdateUser {
  name: string;
  telephone: string;
  birthDate: string;
}

export interface IUpdateUser {
  id: string;
  name?: string;
  telephone?: string;
  birthDate?: string;
}
