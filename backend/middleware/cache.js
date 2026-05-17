import { getCache, setCache } from '../services/cacheService.js';

export function cacheMiddleware(keyBuilder, ttlSeconds) {
  return async (req, res, next) => {

    const key = keyBuilder(req);

   
    const cached = await getCache(key);
    if (cached !== null) {
      return res.json(cached);   
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      
      if (body && body.success !== false) {
        setCache(key, body, ttlSeconds);
      }
      return originalJson(body);  
    };

    next();  
  };
}