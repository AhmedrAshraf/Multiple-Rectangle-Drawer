import "./App.css";
import Konva from "konva";
import React, { useState } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";

function App() {
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [col, setCol] = useState("");
  const [rectangle, setRectangle] = useState([]);
  const [firstClick, setFirstClick] = useState(false);

  function handleClick({ clientX, clientY }) {
    let array = [...rectangle];
    let color = Konva.Util.getRandomColor();
    if (firstClick) {
      let w = clientX - x;
      let h = clientY - y;
      array.push({ x, y, width: w, height: h, color: col });
    } else {
      setx(clientX);
      sety(clientY);
      setCol(color);
    }
    setFirstClick(!firstClick);
    setRectangle(array);
  }

  function handleMove({ clientX, clientY }) {
    let array = [...rectangle];
    if (firstClick) {
      let w = clientX - x;
      let h = clientY - y;
      let idx = array.length ? array.length - 1 : 0;
      array[idx] = { color: col, height: h, width: w, x, y };
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
                <Group x={e.x} y={e.y}>
                  <Rect
                    noise={1}
                    opacity={0.5}
                    stroke="black"
                    shadowBlur={1}
                    fill={e.color}
                    width={e.width}
                    strokeWidth={1}
                    height={e.height}
                    filters={[Konva.Filters.Noise]}
                  />
                </Group>
              );
            })}
        </Layer>
      </Stage>
      <div
        className="box box-a"
        onClick={handleClick}
        onMouseMove={handleMove}
      ></div>
    </div>
  );
}

export default App;
