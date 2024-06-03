import React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../static/css/content.css';
import ParticleAnimation from '../components/ParticleAnimation'

const Sandbox = () => {
  const [text, setTextArea] = useState("hello");
  const [color, setColor] = useState("#e57676");
  const [textSize, setTextSize] = useState(120);
  const [distY, setDistY] = useState(150);
  const [particleSpread, setParticleSpread] = useState(1);
  const [particleSize, setParticleSize] = useState(1);
  const [mouseRadius, setMouseRadius] = useState(50);

  const [maxTextSize, setMaxTextSize] = useState(180)


  useEffect(() => {
    if (window.innerWidth < 950) {
      setMaxTextSize(100)
    }
    if (window.innerWidth < 400) {
      setMaxTextSize(60)
    }
  },[] )

  console.log(window.innerWidth, maxTextSize)

  // const hexToRgb = (hex) => {
  //   let r = 0, g = 0, b = 0;
  //   if (hex.length === 4) {
  //     r = parseInt(hex[1] + hex[1], 16);
  //     g = parseInt(hex[2] + hex[2], 16);
  //     b = parseInt(hex[3] + hex[3], 16);
  //   } else if (hex.length === 7) {
  //     r = parseInt(hex[1] + hex[2], 16);
  //     g = parseInt(hex[3] + hex[4], 16);
  //     b = parseInt(hex[5] + hex[6], 16);
  //   }
  //   return `rgb(${r}, ${g}, ${b})` ;
  // }
  
  // const [color, setColor] = useState(hexToRgb("#e57676"));
  // const [color2, setColor2] = useState(hexToRgb("#e57676"));
  

  const [showHelp, setShowHelp] = useState(false)
  const [helpText, setHelpText] = useState("Helpful messages will be displayed here when you hover over the controls above")

  const handleCheckboxChange = () => {
    setShowHelp(!showHelp);
    if (helpText) {
      setHelpText("Helpful messages will be displayed here when you hover over the controls above")
    }
  }
  // console.log(color)
  // console.log(color2)

  const handleMouseEnter = (text) => {
      setHelpText(text);
  };


  return (
    <div className="block m-6 more-margin">
      <Helmet>
        <title>Particle Sandbox</title>
        <meta name="description" content="Sandbox page of my portfolio." />
      </Helmet>
      <div className="block mb-6">
        {/* <h1 className="is-size-1">
          Welcome To
        </h1> */}
      </div>
      <div className="container">
        <div className="box has-text-left is-size-5 mb-6">
          <ParticleAnimation source="Sandbox" text={text} userTextSize={textSize} color={color} /*color2={color2}*/ 
            constellation={false} fixedY={false} textDistY={distY} mouseRad={mouseRadius} particleSpread={particleSpread}
            particleSize={particleSize} />

          {/*  --------------- Row 1 ---------------------------- */}
          <div className='controls'>
            <div className='control-item'>
              <label htmlFor="range">Text size</label>
              <br />
              <input className='ht' type="range" id="textSize" name="textSize" step="1" min="10" max={maxTextSize}
                value={textSize} onChange={e => setTextSize(e.target.value)} />
            </div>

            <div className='control-item'  onMouseEnter={() => handleMouseEnter("Space after a word will set the next word on the next row.")}>
              <div className='control-color'>
                <label htmlFor="input">Text</label>
                <br />
                <input className='input is-size-6 ht' type="text" id="text" name="text" minLength="1" maxLength="15"
                  value={text} onChange={e => setTextArea(e.target.value)} />
              </div>
            </div>

            <div className='control-item is-centered'>
              <label htmlFor="textColor">Text Color</label>
              <br />
              <input className='is-size-5 ht' type="color" id="textColor" name="textColor"
                value={color} onChange={e => setColor(e.target.value)} />
            </div>

            <div className='control-item'>
              <label htmlFor="select">Particle Effect</label>
              <br />
              <div className="select is-medium">
                <select >
                  <option value>Particle Text</option>
                  <option >Coming soon...</option>
                  {/* <option >Particle Trail</option> */}
                  {/* <option>With options</option> */}
                </select>
              </div>
            </div>
          </div>

          {/*  --------------- Row 2 ---------------------------- */}
          <div className='controls'>
            <div className='control-item' onMouseEnter={() => handleMouseEnter("Change the Y-coordinate (height, up/down) of the text.")}>
              <label htmlFor="textDistY">Text Y Position</label>
              <br />
              <input className='ht' type="range" id="textDistY" name="textDistY" step="1" min="20" max="250"
                value={distY} onChange={e => setDistY(e.target.value)} />
            </div>

            <div className='control-item' onMouseEnter={() => handleMouseEnter("Change the spacing between the particles.")}>
              <label htmlFor="particleSpread">Particle Spread</label>
              <br />
              <input className='ht' type="range" id="particleSpread" name="particleSpread" step=".1" min=".5" max="3.0"
                value={particleSpread} onChange={e => setParticleSpread(e.target.value)} />
            </div>


            <div className='control-item' onMouseEnter={() => handleMouseEnter("Change the size of particles.")}>
              <label htmlFor="particleSize">Particle Size</label>
              <br />
              <input className='ht' type="range" id="particleSize" name="particleSize" step=".1" min="1" max="5"
                value={particleSize} onChange={e => setParticleSize(e.target.value)} />
            </div>

            <div className='control-item' onMouseEnter={() => handleMouseEnter("Change the size of the mouse radius (size of circle interacting with particles).")}>
              <label htmlFor="mouseRadius">Mouse Radius</label>
              <br />
              <input className='ht' type="range" id="mouseRadius" name="mouseRadius" step="1" min="10" max="250"
                value={mouseRadius} onChange={e => setMouseRadius(e.target.value)} />
            </div>
          </div>

          {/*  --------------- Row 3 ---------------------------- */}
          <div className='controls'>
            <div className='control-item'>
              <label className="checkbox">
                <input type="checkbox" onChange={handleCheckboxChange}/>
                Help
              </label>
            </div>
          </div>


        </div>
      </div>

      {showHelp && (
        <div className="container">
          <span className='box helpBox is-size-4'>{helpText}</span>
        </div>
      )}

    </div>
  )
}

export default Sandbox;
