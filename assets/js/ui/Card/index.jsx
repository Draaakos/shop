import css from './index.css';

const Card = ({ text, backgroundImg }) => {
  const style = {
    backgroundImage: `url(${backgroundImg})`
  };

  return (
    <div className={css.card} style={style}>
      <div className={css.wrapper}>
        <div>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Card;
