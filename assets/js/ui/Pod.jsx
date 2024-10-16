import classNames from 'classnames';
import thousandFormat from 'utils/thousandFormat';
import { askForConfirm, notify } from 'utils/notifications';

const addItem = (data, itemName) => (evt) => {
  evt.preventDefault();
  const item = {
    id: data.id,
    sku: data.sku,
    price: data.price,
    quantity: 1,
    name: data.name,
    images: data.images,
    url: data.url
  };

  let beforeItems = JSON.parse(localStorage.getItem(itemName));
  let beforeSkus = JSON.parse(localStorage.getItem(`${itemName}-skus`));
  if(!beforeItems) {
    localStorage.setItem(itemName, JSON.stringify([]));
    localStorage.setItem(`${itemName}-skus`, JSON.stringify([]));

    beforeItems = JSON.parse(localStorage.getItem(itemName));
    beforeSkus = JSON.parse(localStorage.getItem(`${itemName}-skus`))
  };

  const itemExists = !!(beforeItems.find(product => product.id === data.id));

  if (itemExists) {
    if (!askForConfirm("esta seguro de querer eliminar este producto?")) return;
    const itemsFiltered = beforeItems.filter(product => product.id !== data.id);
    localStorage.setItem(itemName, JSON.stringify(itemsFiltered));

    const indexElement = beforeSkus.indexOf(data.sku);
    beforeSkus.splice(indexElement, 1);
    localStorage.setItem(`${itemName}-skus`, JSON.stringify(beforeSkus));
  } else {
    beforeItems.push(item);
    beforeSkus.push(item.sku)

    localStorage.setItem(itemName, JSON.stringify(beforeItems));
    localStorage.setItem(`${itemName}-skus`, JSON.stringify(beforeSkus));
    notify("producto agregado correctamente");
  }

  window.location.reload();
}

const Pod = ({ data, isLike }) => {
  const imageUrl = data.images.length
    ? data.images[0].url
    : null;

  const likedClasses = classNames({
    'option': true,
    'option--liked': isLike
  });

  return(
    <a className="wrapper-link" href={data.url}>
      <div className="pod">
        <div className="pod__head">
            <img src={imageUrl} />

            <div className="pod__head__bar">
              <div className="options">
                <div className="option">
                  <i className="fa fa-shopping-bag" aria-hidden="true" />
                </div>
                <div className={likedClasses} onClick={addItem(data, "like")}>
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </div>
              </div>
            </div>
        </div>

        <div className="pod__body">
          <div className="pod__body__name">{data.name}</div>
          <div className="pod__body__stars">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="pod__body__price">$ {thousandFormat(data.price)}</div>
        </div>
      </div>
    </a>
  );
};

export default Pod;
