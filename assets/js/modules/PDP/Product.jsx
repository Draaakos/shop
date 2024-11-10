const ApplicationItem = ({ item }) => {
  return (
    <div>
      <div>{item.name}</div>
      <div>{item.description}</div>
    </div>
  );
};


const Product = ({ data }) => {
  const applications = data.applications
    .map((application, idx) => <ApplicationItem key={`application-${idx}`} item={application} />
  );

  const applicationsBlock = applications.length ? (
    <div>
      <h3>Aplicaciones</h3>
      {applications}
    </div>
  ) : null;

  return (
    <div className="product">
      <div className="product__image">Imagen</div>
      <div className="product__description">
        <h2>{data.name}</h2>
        <div>{data.description}</div>
        {applicationsBlock}
        <h3>Usos</h3>
        <div>{data.usage.aromatic}</div>
        <div>{data.usage.internal}</div>
        <div>{data.usage.topical}</div>
      </div>
    </div>
  )
};

export default Product;
