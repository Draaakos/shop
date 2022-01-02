import React from 'react';
import classNames from 'classnames';

const VerticalItem = ({ url, onClick, isImageSelected }) => {
  const classes = classNames({
    "gallery__menu__item gallery__menu__item": true,
    "gallery__menu__item gallery__menu__item--active": isImageSelected
  });

  return(
    <div className={classes} onClick={onClick}>
      <img src={url} alt={url}/>
    </div>
  );
};

const Gallery = ({ images, imageSelected, onClick }) => {
  return (
    <div className="gallery">
      <div className="gallery__wrapper">
        <img src={images[imageSelected].url} alt="" />
        <div className="gallery__menu">
          { images.map((data, index) => (
            <VerticalItem
              url={data.url}
              key={`vertical-${index}`}
              onClick={() => onClick(index)}
              isImageSelected={!!(imageSelected === index)}
            />)
          )}
        </div>
      </div>
    </div>
  )
}

export default Gallery;
