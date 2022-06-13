import {Cached} from "../../src/cache/Cached";
import {Cache} from "../../src/cache/InMemoryCache";

const someFn = jest.fn(() => Promise.resolve())

class Dummy {
  @Cached(Cache)
  doSmth() {
    return someFn()
  }
}


describe('Cached', () => {
    const dummy = new Dummy()

    it('should call the function only once', async () => {
      await dummy.doSmth()
      await dummy.doSmth()
      await dummy.doSmth()
      expect(someFn).toHaveBeenCalledTimes(1)
    })

  afterAll(() => {
    Cache.clear();
    jest.clearAllMocks()
  })
});
