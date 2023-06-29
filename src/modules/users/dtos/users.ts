interface IUsers {
  id: string;
  name: string;
  email: string;
  telephone: string | null;
  birth_date: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
}

interface IRequestCreateUser {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  birthDate: string;
}

interface ICreateUser {
  id: string;
  name: string;
  email: string;
  telephone: string;
  birthDate: string;
  password: string;
}

interface IRequestUpdateUser {
  name: string;
  telephone: string;
  birthDate: string;
}

interface IUpdateUser {
  id: string;
  name?: string;
  telephone?: string;
  birthDate?: string;
}

export {
  IUsers,
  IRequestCreateUser,
  ICreateUser,
  IRequestUpdateUser,
  IUpdateUser,
};
