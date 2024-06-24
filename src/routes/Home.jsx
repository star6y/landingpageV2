import React from 'react';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../static/css/content.css';
import ParticleAnimation from '../components/ParticleAnimation'

const Home = () => {
  const [showSpanElem, setShowSpanElem] = useState(true);
  // const [animateSpanElem, setAnimateSpanElem] = useState(false);

  // useEffect(() => {
  //   const showSpan = async () => {
  //     setAnimateSpanElem(false);
  //     await sleep(2000);
  //     setShowSpanElem(true);
  //     setAnimateSpanElem(true);
  //     await sleep(4000);
  //     setAnimateSpanElem(false);
  //     await sleep(1000);  // time for fadeOut animation to complete
  //     setShowSpanElem(false);
  //   };

  //   showSpan();
  // }, []);

  // function sleep(time) {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // }
  // const location = useLocation();

  const hideSpan = () => {
    setShowSpanElem(false);
  }

  return (
    <div className="block m-6 more-margin">
      <Helmet>
        <title>Andrei Anicescu</title>
        <meta name="description" content="Home page of my portfolio." />
      </Helmet>
      <div className="block mb-6">
        <h1 className="is-size-1">
          Welcome To
        </h1>
      </div>
      <div className="container ">
        <div className="box has-text-left is-size-5 mb-6">
          {showSpanElem && (
            <div className=" fade-in-out show position-absolute" onMouseOver={hideSpan}>
              <span className='box normal-box is-size-4'>Hover your mouse over the text below</span>
            </div>
          )}
          <ParticleAnimation source={"home"} text={"Andrei's Portfolio"} color={"rgb(229,118,118)"} userTextSize={120}
            fixedY={true} textDistY={150} mouseRad={50} />
        </div>
      </div>

      {/* {showSpanElem && (
        <div className={`container fade-in-out ${animateSpanElem ? 'show' : 'hide'}`}>
          <span className='box small-box is-size-4'>Hover your mouse over the above text</span>
        </div>
      )} */}
    </div>
  )
}

export default Home;
