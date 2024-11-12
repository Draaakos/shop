const Breadcrumb = ({ items }) => {
  const blocks = items.map((item, idx) => {
    const onClick = url => () => url != null ? window.location.assign(url) : null;

    return (
      <div onClick={onClick(item.url)} key={`item-${idx}`} className="breadcrumb__item">
        {item.name}
        {item.url ? <span className="breadcrumb__separator"> / </span> : null}
      </div>
    );
  });

  return (
    <div className="breadcrumb">
      {blocks}
    </div>
  )
};

export default Breadcrumb
;
