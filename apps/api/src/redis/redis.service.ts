import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redis: RedisClientType;

  constructor(private readonly configService: ConfigService) {
    this.redis = createClient({
      url: configService.get('REDIS_URL'),
    });
  }

  async onModuleInit() {
    await this.redis.connect();
  }

  async set(key: string, value: any, ttl = 60 * 30) {
    await this.redis.set(key, JSON.stringify(value), {
      expiration: { type: 'EX', value: ttl },
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async delete(key: string) {
    await this.redis.del(key);
  }

  async deleteAll() {
    await this.redis.flushAll();
  }

  onModuleDestroy() {
    this.redis.destroy();
  }
}
