import React, { useEffect, useState } from 'react';
import Pod from 'ui/Pod';

const checkArrValue = (arr, value) => !!(arr.indexOf(value) >= 0);

const ProductList = ({ products }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const likedSkus = JSON.parse(localStorage.getItem('like-skus'));

    if (!likedSkus) {
      localStorage.removeItem('like-skus');
      return;
    }

    setLikedProducts(likedSkus);
  }, []);

  return (
    <section className="page-wrapper">
      <div className="breadcrumb">
        <div className="breadcrumb__item">
          <i className="fa fa-home" aria-hidden="true"></i>
          <div>
            <a href="/">Inicio</a>
          </div>
        </div>

        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <div>
          <a href="/productos">productos</a>
        </div>
      </div>
      <div className="plp">
        {products.map((product, index) => (
          <Pod
            data={product}
            key={`pod-${index}`}
            isLike={checkArrValue(likedProducts, product.sku)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
