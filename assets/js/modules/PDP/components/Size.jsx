
import classNames from 'classnames';

const SizeItem = ({ data, onClick, isSelected }) => {
  const classes = classNames({
    "size-item": true,
    "size-item--active": isSelected
  });

  return (
    <div
      className={classes}
      onClick={onClick(data.name)}
    >
      {data.name}
    </div>
  );
};

const Size = ({ sizeList, onClick, sizeSelected }) => {
  const size = sizeList
    .map((data ,index) =>
      <SizeItem
        data={data}
        key={`size-${index}`}
        onClick={onClick}
        isSelected={!!(data.name === sizeSelected)}
      />
    );

  return(
    <section className="size-list">
      { size }
    </section>
  )
}

export default Size;
