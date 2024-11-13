import Menu from 'ui/Menu';
import Breadcrumb from 'ui/Breadcrumb';
import Filter from './components/Filter';
import Footer from 'ui/Footer';
import POD from './components/POD';



const PLP = () => {
  const pods = window.serializedContent
    .map((pod, idx) => <POD key={`pod-${idx}`} data={pod} />)

  return (
    <div>
      <Menu />
      <div className='page'>
        <div className='plp'>
          <Breadcrumb items={[
              { name: 'Inicio', url: '/'},
              { name: 'Productos', url: null}
            ]}
          />

          <div className='plp__content'>
            <div><Filter /></div>
            <div>
              <div className='plp__list_banner'><img src={`/static/${VERSION}/images/banner_default.jpg`} /></div>
              <div className='plp__list_title'>Mostrando {pods.length} resultados:</div>
              <div className='plp__list'>
                {pods}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PLP;
