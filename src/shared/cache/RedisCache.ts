import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../config/cache';

class RedisCache {
  private readonly client: RedisClient;
  private connected: boolean = false;

  constructor() {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  public async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    if (!this.connected) {
      const keys = await this.client.keys(`${prefix}:*`);

      const pipeline = this.client.pipeline();

      keys.forEach((key) => {
        pipeline.del(key);
      });

      await pipeline.exec();
    }
  }

  public async invalidateAll(): Promise<void> {
    await this.client.flushall();
  }

  public async close(): Promise<void> {
    await this.client.disconnect();
  }

  public async isConnected(): Promise<boolean> {
    return this.connected;
  }
}

export default new RedisCache();
