import css from './index.css';


const Image = ({ src, text }) => {
  return (
    <div className={css.wrapper}>
      <img className={css.image} src={src} />
      <div className={css.content}>
        <div className={css.box}>{text}</div>
      </div>
    </div>
  );
};

export default Image;
