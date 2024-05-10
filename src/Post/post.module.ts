import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes(
        { path: 'post/create-post', method: RequestMethod.POST },
        { path: 'post/update-post', method: RequestMethod.PUT },
        { path: 'post/delete-post/:id', method: RequestMethod.DELETE },
        { path: 'post/user-posts', method: RequestMethod.GET },
      );
  }
}
