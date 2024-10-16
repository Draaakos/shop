import { get } from './fetchUtil.js';

const service = {
  productSku(sku) {
    return get(`/api/product/${sku}`)
      .then(response => response.json())
  }
}

export default service;
