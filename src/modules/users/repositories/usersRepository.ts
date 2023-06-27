import { prisma } from "@/libs/prismaClient";
import { Users, CreateUser } from "@/modules/users/dtos/users";
import { IUsersRepositories } from "@/modules/users/iRepositories/IUsersRepositories";

class UsersRepository implements IUsersRepositories {
  create(user: CreateUser): Promise<Users> {
    return prisma.users.create({ data: user });
  }

  listByEmail(email: string): Promise<Users | null> {
    return prisma.users.findFirst({
      where: { email: { equals: email } },
    });
  }
}

export { UsersRepository };
