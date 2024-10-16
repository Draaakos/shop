import React, { useState, useEffect, useRef } from 'react';
import css from './index.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Función para iniciar el intervalo
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(images.length / (window.innerWidth < 768 ? 1 : 3))); // Cambia el índice según el total de bloques
    }, 4000);
  };

  // Función para detener el intervalo
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
  }, [images.length]);

  // Función para cambiar manualmente de imagen
  const goToSlide = (index) => {
    setCurrentIndex(index);
    stopInterval();
    startInterval();
  };

  const getWrapperStyle = () => {
    const imagesToShow = window.innerWidth < 768 ? 1 : 3; // Número de imágenes a mostrar según el tamaño de pantalla
    return {
      display: 'flex',
      width: `${(Math.ceil(images.length / imagesToShow) * 100)}%`, // Ancho total según el número de bloques
      transform: `translateX(-${(currentIndex * (100 / Math.ceil(images.length / imagesToShow)))}%)`, // Mueve el carrusel
    };
  };

  const items = [];
  // Agrupamos las imágenes en bloques de 3 para desktop y 1 para mobile
  for (let i = 0; i < images.length; i += (window.innerWidth < 768 ? 1 : 3)) {
    items.push(
      <div className={css.imageContainer} key={i}>
        {images.slice(i, i + (window.innerWidth < 768 ? 1 : 3)).map((image, index) => (
          <img className={css.image} src={image} alt={`Carousel ${i + index}`} key={index} />
        ))}
      </div>
    );
  }

  // Calcular la cantidad de puntos en función de las imágenes
  const totalDots = Math.ceil(images.length / (window.innerWidth < 768 ? 1 : 3));

  return (
    <div className={css.carousel}>
      <div className={css.wrapper} style={getWrapperStyle()}>
        {items}
      </div>
      <div className={css.dotsContainer}>
        {Array.from({ length: totalDots }).map((_, index) => ( // Usa totalDots para los puntos
          <span
            key={index}
            className={`${css.dot} ${currentIndex === index ? css.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
