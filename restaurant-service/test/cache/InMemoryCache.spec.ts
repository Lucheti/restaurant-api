import {Cache} from "../../src/cache/InMemoryCache";


//create tests for a basic in memory cache

const cache = Cache;

describe('InMemoryCache', () => {
  it('should set a value', async () => {
    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  it('should delete a value', async () => {
    cache.set('key', 'value');
    cache.delete('key');
    expect(cache.get('key')).toBe(undefined);
  })

  it('should clear the cache', async () => {
    cache.set('key', 'value');
    cache.clear();
    expect(cache.get('key')).toBe(undefined);
  })

  it('should return keys', async () => {
    cache.set('key', 'value');
    expect(cache.keys()).toEqual(['key']);
  })

  it('should return undefined if key is not in cache', async () => {
    expect(cache.get('key')).toBe(undefined);
  })

  afterEach(() => {
    cache.clear();
  })
  afterAll(() => {
    jest.clearAllMocks()
  })
});
