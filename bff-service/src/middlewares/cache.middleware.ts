import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CacheService } from '../services';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
    constructor(private cacheService: CacheService) {}

    use(req: Request, res: Response, next) {
        try {
            const cachedResponse = this.cacheService.getCachedResponse(
                req.path.split('/')[1],
            );
            if (cachedResponse) {
                return res.status(cachedResponse.status).json(cachedResponse.data);
            }
        } catch (_) {}
        next();
    }
}