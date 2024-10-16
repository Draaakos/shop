

const Item = ({ data, isLastItem }) => (
  <a href={data.url} className="breadcrumb__item">
    <i className={data.icon} aria-hidden="true"></i>
    <div>{data.name}</div>
    { !isLastItem ? <i className="fa fa-angle-right" aria-hidden="true"></i> : null }
  </a>
);

const Breadcrumb = ({ items }) => (
  <div className="breadcrumb">
    {
      items.map((item, index, arr) =>
        <Item
          key={`breadcrumb-${index}`}
          data={item}
          isLastItem={!!(arr.length-1 === index)}
        />
      )
    }
  </div>
);

export default Breadcrumb;
