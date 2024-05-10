import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(
    authorId: string,
    title: string,
    content: string,
    published?: boolean,
  ) {
    return await this.prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
  }

  async updatePost(
    id: string,
    title?: string,
    content?: string,
    published?: boolean,
  ) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        published,
      },
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: { id },
    });
  }

  async getPost(id: string) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        Author: true,
      },
    });
  }

  async getAllPosts() {
    return await this.prisma.post.findMany({
      include: {
        Author: true,
      },
    });
  }

  async getUserPosts(id: string) {
    return await this.prisma.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        Author: true,
      },
    });
  }
}
