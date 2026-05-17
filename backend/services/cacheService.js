import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN,
});

const DEFAULT_TTL = parseInt(process.env.CACHE_TTL_SECONDS) || 3600;

//if data there it will return else it will not
export async function getCache(key){
    try{
        const value = await redis.get(key);
        if(value===null || value === undefined){
            console.log('value miss');
            return null;
        }
        console.log('cache found');
        return value;
}
catch (error) {
    console.error(`Cache GET error for ${key}:`, error.message);
    return null; 
}
}

//setting cache either it is storing data or not 
export async function setCache(key,value,ttlSeconds =DEFAULT_TTL ){
    try{
        await redis.set(key, value, { ex: ttlSeconds });
        console.log(`Cached: ${key} (TTL: ${ttlSeconds}s)`);
        return true;
    }catch (error) {
    console.error(`Cache SET error for ${key}:`, error.message);
    return false;   
  }
}
//deleye the key from the cache
export async function deleteCache(key){
    try{
        await redis.del(key);
        console.log('cache cleared');
        return true;
    }
    catch (error) {
    console.error(` Cache DELETE error for ${key}:`, error.message);
    return false;
}
}




// get or fetch

export async function getOrFetch(key, fetchFn, ttlSeconds = DEFAULT_TTL) {

  const cached = await getCache(key);     
  if (cached !== null) {
    return cached;
  }
//fresh daata will collect 
  const freshData = await fetchFn();

  //saves data to redis
  setCache(key, freshData, ttlSeconds);    
  
  return freshData;
}








