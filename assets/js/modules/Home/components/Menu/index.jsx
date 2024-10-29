import { useState } from 'react';
import classNames from 'classnames';
import Option from './Option.jsx';
import css from './index.css';


const Menu = ({ onSelect }) => {
  const [ menuActive, setMenuActive ] = useState(false);

  const classes = classNames({
    [css.menu]: true,
    [css.menu__active]: menuActive
  });

  const filters = [
    {
      title: "Estres",
      filter: ""
    },
    {
      title: "Insonmio",
      filter: ""
    },
    {
      title: "Cansancio",
      filter: ""
    },
    {
      title: "Option 4",
      filter: ""
    },
    {
      title: "Option 4",
      filter: ""
    },
    {
      title: "Option 4",
      filter: ""
    }
  ];

  const options = filters
    .map((option, idx) =>
      <Option
        onClick={onSelect(option)}
        key={`option-${idx}`}
        text={option.title}
      />
  );

  return (
    <div className={classes}>
      <div>{options}</div>
      <div onClick={() => setMenuActive(!menuActive)}>X</div>
    </div>
  );
};

export default Menu;
