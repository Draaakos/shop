import React from 'react';

const Row = ({ data }) => (
  <tr className="row">
    <td className="row__item row__item__flex row__item__name">
      {/* <div className="img-container" style={{ backgroundImage: `url(${data.images[0].url})` }} /> */}
      <div>{data.name}</div>
    </td>
    <td className="row__item">$ {data.price}</td>
    <td className="row__item">1</td>
    <td className="row__item">$ 300.0</td>
    <td className="row__item">
      <button className="close-button">
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </td>
  </tr>
);

export default Row;
