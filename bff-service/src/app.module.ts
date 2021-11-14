import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CacheService, ProxyService } from './services';
import { CacheMiddleware } from './middlewares';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [ProxyService, CacheService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.cacheRoutes) {
      process.env.cacheRoutes.split(',').forEach((path) => {
        consumer
            .apply(CacheMiddleware)
            .forRoutes({ path, method: RequestMethod.GET });
        consumer
            .apply(CacheMiddleware)
            .forRoutes({ path: `${path}/`, method: RequestMethod.GET });
      });
    }
  }
}
