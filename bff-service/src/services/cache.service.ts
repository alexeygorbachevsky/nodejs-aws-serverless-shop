import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

const cache: Record<string, { expire: number; data: AxiosResponse }> = {};

@Injectable()
export class CacheService {
    getCachedResponse(path: string): AxiosResponse {
        const currentTimestamp = Date.now();
        if ((cache[path]?.expire || 0) >= currentTimestamp) {
            return cache[path].data;
        }
        cache[path] = null;
        return null;
    }

    setCachedResponse(path: string, data: AxiosResponse) {
        cache[path] = { expire: Date.now() + 2 * 60 * 1000, data };
    }
}