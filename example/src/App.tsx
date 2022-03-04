import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'CASHBACK' },
  { option: 'SKIN' },
  { option: 'NADA', style: { textColor: '#f9dd50' } },
  { option: 'NG.TOKENS' ,style: { textColor: '#fff' }},
  { option: '+1 GIRO' },
  { option: 'CUPOM' },
  { option: 'CASHBACK' },
  { option: 'SKIN' },
  { option: 'NADA', style: { textColor: '#f9dd50' } },
  { option: 'NG.TOKENS' ,style: { textColor: '#fff' }},
  { option: '+1 GIRO' },
  { option: 'CUPOM' },
  // { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
  // { option: 'WHEEL' },
];

const backgroundColors = [
  "rgb(125,44,245)",
  "rgb(1,205,10)",
  "rgb(254,0,3)",
  "#000",
  "rgb(193,193,193)",
  "rgb(241,241,241)",
];
const textColors = ['#0b3351'];
const outerBorderColor = '#C5C5C5';//'#eeeeee';
const outerBorderWidth = 1;
const innerBorderColor = '#C5C5C5';//'#eeeeee';//'#30261a';
const innerBorderWidth = 1;
const innerRadius = 75;
const radiusLineColor = '#C5C5C5';//'#eeeeee';
const radiusLineWidth = 1;
const fontSize = 12;
const textDistance = 86;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = 1
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontSize={fontSize}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          perpendicularText
          textDistance={textDistance}

          onStopSpinning={() => {
            setMustSpin(false)
          }}
        />
        <button className={'spin-button'} onClick={handleSpinClick}>
          SPIN
        </button>
      </header>
    </div>
  );
};

export default App;
