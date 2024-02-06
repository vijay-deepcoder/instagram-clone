import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@core/configuration/configuration.module';
import { Logger } from '@core/logger';
import { DatabaseModule } from '@core/database/database.module';
import { RepositoryModule } from '@shareable/database/repository';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@core/jwt/jwt.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { SaveModule } from './modules/save/save.module';
import { StoryModule } from './modules/story/story.module';
import { CollectionModule } from './modules/collection/collection.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    RepositoryModule,
    JwtModule,
    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    SaveModule,
    StoryModule,
    CollectionModule,
    SearchModule,
  ],
  providers: [Logger],
})
export class AppModule {}
