import { useState } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState('white');

  return (
    <div className="app" style={{ backgroundColor: bgColor }}>
      <div className="button-container">
        <button onClick={() => setBgColor('red')} className="btn red">Red</button>
        <button onClick={() => setBgColor('blue')} className="btn blue">Blue</button>
        <button onClick={() => setBgColor('green')} className="btn green">Green</button>
      </div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  let increase = () => 
  {
    setCount(increase => increase + 1);
    setCount(increase => increase + 1);
    setCount(increase => increase + 1);
    setCount(increase => increase + 1);
    setCount(increase => increase + 1);
  };

  return (
    <div className="counter">
      <h1>{count}</h1>
      <button onClick={increase}>Increment</button>
    </div>
  );
}

export default App;
