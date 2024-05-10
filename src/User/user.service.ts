import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteAllOtp(email: string) {
    return await this.prisma.otp.deleteMany({
      where: { email },
    });
  }

  async createOtp(email: string, otp: string) {
    return await this.prisma.otp.create({
      data: {
        email,
        otp,
      },
    });
  }

  async getOtp(email: string) {
    return await this.prisma.otp.findFirst({
      where: { email },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(email: string, name: string, password: string) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
