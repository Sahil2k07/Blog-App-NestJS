import { Module } from '@nestjs/common';
import { PostModule } from './Post/post.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
