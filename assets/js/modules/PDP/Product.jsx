import classNames from "classnames";

const ApplicationItem = ({ item }) => {
  return (
    <div>
      <div className="title">{item.name}</div>
      <div className="description">{item.description}</div>
    </div>
  );
};


const Product = ({ data }) => {
  const applications = data.applications
    .map((application, idx) => <ApplicationItem key={`application-${idx}`} item={application} />
  );

  const applicationsBlock = applications.length ? (
    <div className="pdp__applications">
      <div className="pdp__applications__title">Aplicaciones</div>
      <div className="pdp__applications__list">{applications}</div>
    </div>
  ) : null;


  const categories = data.categories.map((category, idx) => <div key={`category-${idx}`}>- {category}</div>)

  const categoryClasses = classNames({
    "product__detail__categories": true,
    "product__detail__categories__extend": categories.length > 5
  })

  return (
    <div>
      <div className="product">
        <div className="product__image">
          <img src={`/static/${VERSION}/images/products/essencial/lavender.webp`} />
        </div>
        <div className="product__detail">
          <div className="product__name">{data.name}</div>
          <div className="product__detail__description">{data.description}</div>


          <div>
            <h3>Usos</h3>
            <div>- {data.usage.aromatic}</div>
            <div>- {data.usage.internal}</div>
            <div>- {data.usage.topical}</div>
          </div>

          <div>
            <h3>Categorias</h3>
            <div className={categoryClasses}>{categories}</div>
          </div>
        </div>
      </div>

      {applicationsBlock}
    </div>
  )
};

export default Product;
