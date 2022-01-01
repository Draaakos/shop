import React, { useState } from 'react';
import Breadcrumb from 'ui/Breadcrumb';
import Input from 'ui/Input';
import service from 'services/order';
import Spinner from 'ui/Spinner';
import thousandFormat from 'utils/thousandFormat';
import { notify } from 'utils/notifications';

const phoneRegex = /\D*([+56])(\d{5})(\d{4})\D*/g;

const breadcrumbData = [
  {
    name: "Inicio",
    icon: "fa fa-home",
    url: "/"
  },
  {
    name: "Checkout",
    icon: "fa fa-usd",
    url: "/checkout"
  }
];

const Item = ({ data }) => (console.log(data),
  <div className="checkout__order__detail__content">
    <div>x {data.quantityToBuy} - {data.name}</div>
    <div className="strong">${thousandFormat((data.price * data.quantityToBuy), 0)}</div>
  </div>
);

const Checkout = ({ products }) => {
  const [errors, updateErrors] = useState({});
  const [form, updateForm] = useState({});
  const [isLoading, updateLoading] = useState(false);

  const total = products
    .reduce((acc, next) => { return acc + (next.price * next.quantityToBuy) }, 0);

  const onSend = evt => {
    evt.preventDefault();
    if(Object.keys(errors).length) {
      notify('hay campos invalidos');
      return;
    }

    updateLoading(true);

    const payload = {
      ...form,
      customer: sessionStorage.getItem('uuid'),
      amount: total,
      currency: 'CLP',
      country: 'CL',
      products
    }

    service.newOrder(payload)
      .then(response => window.location.assign(response.result.payment.data.payUrl[0].url))
  }


  const onChangeInput = obj => {
    updateForm({
      ...form,
      ...{ [obj.key]: obj.value }
    });
  }


  return(
    <section className="page-wrapper">
      <Spinner status={isLoading} fullPage />
      <Breadcrumb items={breadcrumbData} />

      <form className="checkout" onSubmit={onSend}>
        <div className="checkout__form">
          <div className="checkout__form__title">DETALLE DE ENVIO</div>

          <Input
            type='text'
            label='Dirección'
            name='address'
            getValue={onChangeInput}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='serrano 980, Santiago'
          />

          <Input
            type='text'
            label='Codigo postal'
            name='zipCode'
            getValue={onChangeInput}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='8320000'
          />

          <Input
            type='text'
            label='Teléfono'
            name='phone'
            getValue={onChangeInput}
            regex={phoneRegex}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='+56922224444'
          />
        </div>

        <div className="checkout__order">
          <div className="checkout__order__title">TU ORDEN</div>

          <div className="checkout__order__detail">
            <div className="checkout__order__detail__content">
              <div className="strong">PRODUCTO</div>
              <div className="strong">PRECIO</div>
            </div>

            { products.map((data, index) => <Item data={data} key={`item-${index}`} />) }

          </div>

          <hr />

          <div className="checkout__order__detail__content">
            {/* <div>Total (IVA incluido)</div> */}
            <div className="strong">${thousandFormat(total, 0)}</div>
          </div>

          <hr />

          <div style={{ marginTop: '3em' }}>
            <input
              style={{ margin: '0 auto', display: 'block' }}
              type="submit"
              className="default-button"
              value={`Pagar $ ${thousandFormat(total, 0)}`}
            />
          </div>

        </div>
      </form>
    </section>
  )
}

export default Checkout;
