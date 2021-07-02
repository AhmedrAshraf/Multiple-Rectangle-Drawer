import "./App.css";
import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

function App() {
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [rectangle, setRectangle] = useState([]);
  const [firstClick, setFirstClick] = useState(false);

  function handleClick(event) {
    var { clientX, clientY } = event;
    let array = [...rectangle];
    if (firstClick) {
      let w = clientX - x;
      let h = clientY - y;
      array.push({ height: h, width: w, x, y });
      setFirstClick(false);
    } else {
      setx(clientX);
      sety(clientY);
      setFirstClick(true);
    }
    setRectangle(array);
  }

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }}
      >
        <Layer>
          {!!rectangle?.length &&
            rectangle.map((e) => {
              return (
                <Rect
                  x={e.x}
                  y={e.y}
                  fill="gray"
                  width={e.width}
                  height={e.height}
                />
              );
            })}
        </Layer>
      </Stage>
      <div className="box box-a" onClick={handleClick}></div>
    </div>
  );
}

export default App;
