const Publication = ({ data }) => {
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
        <div className='publication__button__item'>Continuar leyendo</div>
      </div>
    </div>
  )
};

export default Publication;
