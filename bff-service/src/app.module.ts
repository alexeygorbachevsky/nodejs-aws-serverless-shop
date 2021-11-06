import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheMiddleware } from './middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
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
