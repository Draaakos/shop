import css from './index.css';


const Menu = () => {
  return (
    <div className={css.menu}>
      <div className={css.logo}>
        <img src={`/static/${VERSION}/images/logo.svg`} />
      </div>
    </div>
  );
};

export default Menu;
