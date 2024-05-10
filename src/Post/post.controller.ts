import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Request } from 'express';
import { CreatePostDto, createPostSchema } from '../dto/posts.dto';
import { ZodValidationPipe } from '../pipe/ZodValidationPipe.pipe';
import { UpdatePostDto, updatePostSchema } from '../dto/posts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(@Req() req: Request, @Body() body: CreatePostDto) {
    const { title, content } = body;
    const id = req.user.id;

    if (!title || !content) {
      throw new BadRequestException('Invalid Data from User');
    }

    const post = await this.postService.createPost(id, title, content);

    return {
      success: true,
      msg: 'Post created Successfully',
      data: post,
    };
  }

  @Put('update-post')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updatePostSchema))
  async updatePost(@Body() body: UpdatePostDto) {
    const { id, title, content } = body;

    const post = await this.postService.getPost(id);

    if (!post) {
      throw new NotFoundException('Post not found with the mentioned ID');
    }

    const updatedPost = await this.postService.updatePost(id, title, content);

    return {
      success: true,
      msg: 'Post updated successfully',
      data: updatedPost,
    };
  }

  @Delete('delete-post/:id')
  @HttpCode(200)
  async deletePost(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    if (!post) {
      throw new NotFoundException('Post not found with the mentioned ID');
    }

    const deletedPost = await this.postService.deletePost(id);

    return {
      success: true,
      msg: 'Post deleted Successfully',
      data: deletedPost,
    };
  }

  @Get('get-post/:id')
  @HttpCode(200)
  async getPost(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    if (!post) {
      throw new NotFoundException('Post not found with the mentioned ID');
    }

    return {
      success: true,
      msg: 'Successfully got the Post',
      data: post,
    };
  }

  @Get()
  @HttpCode(200)
  async getAllPosts() {
    const posts = await this.postService.getAllPosts();

    return {
      success: true,
      msg: 'Got all Posts Successfully',
      data: posts,
    };
  }

  @Get('user-posts')
  @HttpCode(200)
  async getUserPosts(@Req() req: Request) {
    const id = req.user.id;

    const posts = await this.postService.getUserPosts(id);

    return {
      success: true,
      msg: 'Got Users Posts Successfully',
      data: posts,
    };
  }
}
