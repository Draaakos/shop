const POD = ({ data }) => {
  const onClick = (id) => {
    return () => {
      window.location.assign(`/productos/${id}`);
    };
  };

  return (
    <div className="pod" onClick={onClick(data.id)}>
      <div className="pod__img"><img src={`/static/${VERSION}/images/products/default.jpg`} /></div>
      <div className="pod__name">{data.name}</div>
    </div>
  );
};

export default POD;
