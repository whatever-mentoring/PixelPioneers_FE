import { API } from "./constants";

class Api {
  constructor(httpClient) {
    this.client = httpClient;
  }

  async comments(_page) {
    const response = await this.client.get("comments", {
      params: { _page, _limit: API.limit }
    });
    return response;
  }
}

export default Api;
