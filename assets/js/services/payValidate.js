import { get } from './fetchUtil.js';

const service = {
  checkStatusPayment(purchaseId) {
    return get(`/api/payment/${purchaseId}`)
      .then(response => response.json())
  }
}

export default service;
