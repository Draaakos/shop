import { get } from './fetchUtil';

const service = {
  checkStatusPayment(purchaseId) {
    return get(`/api/payment/${purchaseId}`)
      .then(response => response.json())
  }
}

export default service;
