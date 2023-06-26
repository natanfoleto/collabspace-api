export interface Users {
  id: string;
  name: string;
  email: string;
  telephone: string | null;
  birth_date: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
}

export interface CreateUser extends Omit<Users, "created_at" | "avatar_url"> {}

export interface RequestUser {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  birthDate: string;
}
