
import thousandFormat from 'utils/thousandFormat';

const HorizontalPod = ({ data }) => (
  <div className="h-pod">
    <div className="h-pod__head">
      {data.name}
    </div>
    <div className="h-pod__body">
      <div>
        <div className="h-pod__body__image">
          <img src={data.images[0].url} />
        </div>
      </div>
      <div className="h-pod__body__detail">
        <div><span className="strong">SKU:</span> {data.sku}</div>
        <div><span className="strong">$ {thousandFormat(data.price, 0)}</span> x {data.quantity} unidad</div>
      </div>
    </div>
  </div>
);

export default HorizontalPod;
