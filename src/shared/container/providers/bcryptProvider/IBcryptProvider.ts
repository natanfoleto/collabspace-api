export interface IBcrypt {
  salt: string;
  hash: string;
}

export interface IBcryptProvider {
  encryptPassword(password: string): Promise<IBcrypt>;
  checkPassword(password: string, currentPassword: string): Promise<boolean>;
}
