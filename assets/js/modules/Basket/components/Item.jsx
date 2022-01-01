import React from 'react';
import thousandFormat from 'utils/thousandFormat';

const Item = ({ data, onRemove }) => {
  let name = data.name;
  let details = "";

  if(data.relatedSkus.length) {
    const product = data.relatedSkus
      .find(element => element.sku === data.sku);

    if(product.variations.color) {
      details = `Color: ${product.variations.color.name}`;
    }

    if(product.variations.size) {
      details = `${details} - Talla: ${product.variations.size.name}`;
    }
    // name = `${product.} ${name}`
  }

  return(
    <tr className="row">
      <td className="row__item row__item__flex row__item__name" onClick={() => window.location.assign(data.url)}>
        <div className="img-container" style={{ backgroundImage: `url(${data.images[0].url})` }} />
        <div>
          <div>{name}</div>
          <div>{details}</div>
        </div>
      </td>
      <td className="row__item">$ {thousandFormat(data.price * data.quantityToBuy)}</td>
      <td className="row__item">{data.quantityToBuy}</td>
      <td className="row__item">
        <button className="close-button" onClick={onRemove}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
};

export default Item;
