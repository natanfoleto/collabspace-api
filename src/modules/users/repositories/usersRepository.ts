import { prisma } from "@/libs/prismaClient";
import { IUsers, ICreateUser, IUpdateUser } from "@/modules/users/dtos/users";
import { IUsersRepositories } from "@/modules/users/iRepositories/IUsersRepositories";

class UsersRepository implements IUsersRepositories {
  create({
    id,
    name,
    email,
    telephone,
    birthDate,
    password,
  }: ICreateUser): Promise<IUsers> {
    return prisma.users.create({
      data: {
        id,
        name,
        email,
        telephone,
        birth_date: birthDate,
        password,
      },
    });
  }

  listByEmail(email: string): Promise<IUsers | null> {
    return prisma.users.findFirst({
      where: { email: { equals: email } },
    });
  }

  listById(id: string): Promise<IUsers | null> {
    return prisma.users.findFirst({
      where: { id },
    });
  }

  async update({ id, name, telephone, birthDate }: IUpdateUser): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        name,
        telephone,
        birth_date: birthDate,
      },
    });
  }

  async inactivate(id: string, status: boolean): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: { active: status },
    });
  }
}

export { UsersRepository };
