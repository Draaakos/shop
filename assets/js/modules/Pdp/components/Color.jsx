import React from 'react';

const ColorItem = ({ data, onClick }) => (
  <div
    className="color-item"
    onClick={onClick(data.name)}
    style={{ backgroundColor: `${data.hexcolor}` }}
  />
);

const Color = ({ colorList, onClick }) => {
  const colors = colorList
    .map((data ,index) =>
      <ColorItem
        data={data}
        key={`color-${index}`}
        onClick={onClick}
      />
    );

  return(
    <section className="color-list">
      { colors }
    </section>
  )
};

export default Color;
