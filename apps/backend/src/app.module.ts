import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosModule } from './photos/photos.module';
import { JudgeModule } from './judge/judge.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 3, // 3 requests per 1 second
      },
      {
        name: 'medium',
        ttl: 10 * 1000, // 10 seconds
        limit: 20, // 20 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60 * 1000, // 1 minute
        limit: 100, // 100 requests per 1 minute
      },
    ]),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        'mongodb://root:example@localhost:27017/jp-photos?authSource=admin',
      {
        retryWrites: true,
        retryReads: true,
        wtimeoutMS: 2400,
      },
    ),
    PhotosModule,
    JudgeModule,
    CategoriesModule,
    AuthorsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
