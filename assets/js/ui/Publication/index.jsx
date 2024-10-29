import { useState } from 'react';
import classNames from 'classnames';

const Publication = ({ data }) => {
  const [ isMoreActive, setIsMoreActive ] = useState(false);

  const classes = classNames({
    'publication__more': true,
    'publication__more__active': isMoreActive
  });

  return (
    <div className='publication'>
      <div>
        <div className='publication__title'>{data.title}</div>
        <div className='publication__subtitle'>{data.subtitle}</div>
      </div>
      <div className='publication__image'>
        <img src={data.img} />
      </div>
      <div className='publication__content'>
        {data.content}
      </div>

      <div className='publication__button'>
        <div
          className='publication__button__item'
          onClick={() => setIsMoreActive(!isMoreActive)}
        >
          { isMoreActive ? 'Leer menos' : 'Continuar leyendo'}
        </div>
      </div>

      <div className={classes}>
        <div className='publication__more__text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quam dolorem nam error autem deserunt cumque vero asperiores explicabo delectus aliquam laborum iure voluptate doloremque, a enim. Sit, provident impedit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sit incidunt cum neque cumque autem corrupti vero fuga possimus, commodi natus accusamus totam rem mollitia exercitationem reiciendis? Sequi, nulla delectus!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum aspernatur asperiores aut reiciendis quibusdam exercitationem accusantium sed mollitia sequi perspiciatis velit ipsum reprehenderit, magnam sunt qui! Delectus eum quasi vero!
        </div>
      </div>
    </div>
  )
};

export default Publication;
