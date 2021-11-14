import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';

@Injectable()
export class ProxyService {
  async getResponse(method, url, data, params, headers) {
    const responseHeaders = headers['authorization']
      ? { Authorization: headers['authorization'] }
      : {};
    if (method === 'GET') {
      return axios.get(url, {
        params,
        headers: responseHeaders,
      });
    }
    return axios.request({
      method: method as Method,
      url,
      ...(Object.keys(data || {}).length > 0 ? { data } : {}),
      params,
      headers: responseHeaders,
    });
  }
}
