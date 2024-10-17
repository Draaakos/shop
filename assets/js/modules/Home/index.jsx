import Menu from 'ui/Menu';
import Carousel from 'ui/Carousel';
import Card from 'ui/Card';
import Publication from 'ui/Publication';


const HomeApp = () => {
  const images = [
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`
  ];

  const publicationList = [
    {
      title: 'Lavanda',
      subtitle: 'La calma y relajación que necesitas cada día',
      img: `/static/${VERSION}/images/publications/publication-1.png`,
      content: 'El aceite esencial de lavanda es un producto imprescindible para quienes buscan relajarse y encontrar equilibrio en su rutina diaria. Ideal para promover un sueño profundo y reparador, ayuda a reducir el estrés y la ansiedad. Además, sus propiedades naturales lo hacen perfecto para aliviar irritaciones menores de la piel o calmar picaduras de insectos. Este aceite es un compañero esencial para cualquier persona que desee disfrutar de una vida más tranquila y libre de tensiones.'
    },
    {
      title: 'Menta',
      subtitle: 'Refrescante energía para cuerpo y mente',
      img: `/static/${VERSION}/images/publications/publication-2.png`,
      content: 'El aceite de menta es conocido por su capacidad para revitalizar y refrescar instantáneamente. Con su aroma vigorizante, es ideal para aumentar la concentración y el enfoque, perfecto para días largos o situaciones de agotamiento mental. Además, al aplicarse sobre la piel, brinda una sensación de frescura que ayuda a aliviar dolores de cabeza, tensiones musculares y molestias digestivas. Este aceite es una opción ideal para tener a mano y enfrentar el día con energía renovada.'
    },
    {
      title: 'Eucalipto',
      subtitle: 'Respira mejor, vive mejor',
      img: `/static/${VERSION}/images/publications/publication-3.png`,
      content: 'El aceite esencial de eucalipto es ideal para apoyar la salud respiratoria. Su aroma fresco y penetrante ayuda a despejar las vías respiratorias, siendo un excelente aliado durante las temporadas de resfriados o alergias. Al inhalarlo o aplicarlo tópicamente, proporciona una sensación refrescante y purificante. Este aceite no solo mejora la respiración, sino que también es conocido por sus propiedades antimicrobianas, lo que lo convierte en una opción ideal para mantener un ambiente limpio y saludable en casa.'
    },
    {
      title: 'Árbol de Té',
      subtitle: 'Poderoso purificador natural',
      img: `/static/${VERSION}/images/publications/publication-4.png`,
      content: 'El aceite de árbol de té es conocido por sus propiedades antimicrobianas y antiinflamatorias. Este aceite es un excelente aliado para el cuidado de la piel, ayudando a tratar imperfecciones, picaduras de insectos y quemaduras menores. Su capacidad para purificar y limpiar lo convierte en un ingrediente esencial en cualquier rutina de belleza natural. También se puede utilizar para desinfectar el hogar, proporcionando un ambiente más seguro y saludable.'
    },
    {
      title: 'Limón',
      subtitle: 'Energía refrescante y purificadora',
      img: `/static/${VERSION}/images/publications/publication-5.png`,
      content: 'El aceite esencial de limón es conocido por su aroma fresco y energizante. Este aceite no solo mejora el estado de ánimo, sino que también es un poderoso purificador natural. Al utilizarlo en un difusor, ayuda a limpiar el aire y crear un ambiente vibrante. También es excelente para la limpieza del hogar, eliminando olores y dejando una sensación de frescura. Incorporar el limón en tu rutina diaria te ayudará a sentirte más alerta y motivado.'
    },
    {
      title: 'Romero',
      subtitle: 'Concentración y claridad mental',
      img: `/static/${VERSION}/images/publications/publication-6.png`,
      content: 'El aceite esencial de romero es un estimulante natural para la mente. Su aroma herbáceo y fresco ayuda a mejorar la concentración y la memoria, lo que lo convierte en un aliado perfecto para el estudio o el trabajo. Además, se ha utilizado tradicionalmente para promover la salud del cabello, ayudando a fortalecer y revitalizar el cuero cabelludo. Con el romero, podrás mejorar tu enfoque y mantener tu mente activa y alerta durante todo el día.'
    }
  ]

  const publications = publicationList
    .map((publication, idx) =>
      <Publication key={`publication-${idx}`} data={publication}/>
    );

  return (
    <div>
      <Menu />
      <Carousel images={images}/>
      <div className='card__section'>
        <Card text="ABOUT ME" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
        <Card text="ABOUT ME" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
        <Card text="ABOUT ME" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
      </div>

      <div className='publication__section'>
        {publications}
      </div>
    </div>
  );
};

export default HomeApp;
