import React, { useState, useEffect } from 'react';
import service from 'services/payValidate';
import Spinner from 'ui/Spinner';
import HorizontalPod from 'ui/HorizontalPod';
import thousandFormat from 'utils/thousandFormat';

const Success = () => {
  const [isLoading, updateLoading] = useState(true);
  const [products, updateProducts] = useState([]);
  const [transaction, updateTransaction] = useState({});

  useEffect(() => {
    if(isLoading && !products.length) {
      const url = new URL(window.location.href);
      const purchaseId = url.searchParams.get('purchase');

      service.checkStatusPayment(purchaseId)
        .then(response => {
          updateLoading(false);
          updateProducts(response.products)
          updateTransaction(response.transaction);
        })
    }
  });

  const productsList = products.map((data, index) =>(
    <HorizontalPod
      data={data}
      key={`pod-${index}`}
    />
  ));

  return(
    <section className="page">
      <Spinner status={isLoading} fullBlock />
      <div className="item-list">
        {productsList}
      </div>
        {
          !isLoading &&
            <div className="status-orden">
              <div>
                <div><span className="strong">Orden de compra:</span> {transaction.order}</div>
                <div><span className="strong">Estado de la orden:</span> {transaction.status}</div>
                <div><span className="strong">Total:</span> $ {thousandFormat(transaction.amount, 0)}</div>
              </div>
            </div>
        }
    </section>
  )
}

export default Success;
