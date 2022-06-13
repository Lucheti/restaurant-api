import ImageApi from "../../src/api/image/ImageApi";

jest.mock('node-fetch', () =>
  jest.fn(() => ({
      json: () => Promise.resolve({images: [1, 2, 3]}),
    })
  ))

describe('ImageApi', () => {
  it('should fetch images from the api', () => {
    expect(ImageApi.getAll()).resolves.toEqual([1, 2, 3]);
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
});
