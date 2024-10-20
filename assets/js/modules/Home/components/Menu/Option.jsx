import css from './index.css';

const Option = ({ text, onClick }) => {
  return (
    <div onClick={onClick} className={css.option}>{text}</div>
  );
};

export default Option;
