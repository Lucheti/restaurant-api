import { Cache } from "./Cache";
import config from "config";

// decorator to cache the result of a function - intended to be used on api calls
export const Cached =
  (cache: Cache) =>
  <Response> (clazz: Object, key: string, descriptor: TypedPropertyDescriptor<() => Promise<Response>>) => {
    const originalMethod = descriptor.value;
    const _key = `${clazz.constructor.name}#${key}`;
    if (!originalMethod) {
      throw new Error(`Method ${key} for class ${clazz.constructor.name} not found`);
    }
    descriptor.value = function () {
      if (cache.has(_key)) {
        config.get("logging.debug") && console.log("Found cache response for " + _key);
        return cache.get(_key);
      } else {
        config.get("logging.debug") && console.log("Found cache response for " + _key);
        return cache.set(_key, originalMethod.apply(this));
      }
    }
  }
