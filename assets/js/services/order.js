import { post } from './fetchUtil.js';

const service = {
  newOrder(payload) {
    return post('/api/order', { ...payload })
      .then(response => response.json())
  }
}

export default service;
