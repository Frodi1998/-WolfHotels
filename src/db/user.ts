import { PrismaClient } from '@prisma/client';
// import assert from 'node:assert';
import { prisma } from './prisma';

type CreateUserInput = {
  uid: number,
  name: string,
  isAdmin: boolean
}

class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  getByUid(uid: number) {
    return this.prismaClient.user.findUnique({ where: { uid } });
  }

  async create({uid, name, isAdmin}: CreateUserInput) {
    return this.prismaClient.user.create({
      data: { uid, name, isAdmin }
    })
  }
}

export const userService = new UserService(prisma);
