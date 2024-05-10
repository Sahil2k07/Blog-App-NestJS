import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from 'src/config/nodemailer.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService, PrismaService],
})
export class UserModule {}
