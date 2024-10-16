
import classNames from 'classnames';

const Spinner = ({ status, fullBlock=false, fullPage=false }) => {
  const spinnerClasses = classNames({
    'spinner': status,
    'spinner--absolute': fullBlock,
    'spinner--fixed': fullPage
  });

  const element = status ? (
    <section className={spinnerClasses}>
      <div className="canvas" />
      <div className="spinner__container">
        <div className="sk-circle">
          <div className="sk-circle1 sk-child" />
          <div className="sk-circle2 sk-child" />
          <div className="sk-circle3 sk-child" />
          <div className="sk-circle4 sk-child" />
          <div className="sk-circle5 sk-child" />
          <div className="sk-circle6 sk-child" />
          <div className="sk-circle7 sk-child" />
          <div className="sk-circle8 sk-child" />
          <div className="sk-circle9 sk-child" />
          <div className="sk-circle10 sk-child" />
          <div className="sk-circle11 sk-child" />
          <div className="sk-circle12 sk-child" />
        </div>
      </div>
    </section>
  ) : null;


  return element
}

export default Spinner;
