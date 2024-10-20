import Option from './Option.jsx';
import css from './index.css';


const Menu = ({ onSelect }) => {
  const data = [
    {
      title: "Option 1",
      filter: ""
    },
    {
      title: "Option 2",
      filter: ""
    },
    {
      title: "Option 3",
      filter: ""
    },
    {
      title: "Option 4",
      filter: ""
    }
  ];

  const options = data
    .map((option, idx) =>
      <Option onClick={onSelect(option)} key={`option-${idx}`} text={option.title}
    />
  );

  return <div className={css.menu}>{options}</div>;
};

export default Menu;
