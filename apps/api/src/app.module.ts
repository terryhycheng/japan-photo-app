import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FirebaseModule } from './firebase/firebase.module';
import { PhotosModule } from './photos/photos.module';
import { RedisModule } from './redis/redis.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
    CloudinaryModule,
    FirebaseModule,
    PhotosModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
