import fetch from "node-fetch";
import config from "config";
import { Cache } from "../../cache/InMemoryCache";
import {Cached} from "../../cache/Cached";
import {GetAllResponse} from "./types";

class ImageApi {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  @Cached(Cache)
  async getAll() {
    console.log("fetching images from " + this.baseUrl);
    const response = await fetch(this.baseUrl)
    const data = await response.json() as GetAllResponse
    return data.images
  }
}

export default new ImageApi(config.get("api-url.image"))
