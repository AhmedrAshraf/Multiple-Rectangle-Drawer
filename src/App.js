import "./App.css";
import Konva from "konva";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group, Text } from "react-konva";

function App() {
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [col, setCol] = useState("");
  const [rectangle, setRectangle] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hoveredRect, setHoveredRect] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'c') {
        clearRectangles();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  function clearRectangles() {
    setRectangle([]);
    setFirstClick(false);
  }

  function handleClick({ clientX, clientY }) {
    let array = [...rectangle];
    let color = Konva.Util.getRandomColor();
    if (firstClick) {
      // Calculate width and height as absolute values
      let width = Math.abs(clientX - x);
      let height = Math.abs(clientY - y);
      
      // Calculate the actual x and y coordinates based on the direction of drawing
      let actualX = Math.min(x, clientX);
      let actualY = Math.min(y, clientY);

      // Ensure minimum size
      if (width > 10 && height > 10) {
        array.push({ 
          x: actualX, 
          y: actualY, 
          width, 
          height, 
          color: col,
          rotation: Math.random() * 5 - 2.5,
          scale: 1,
          opacity: 0.7
        });
      }
    } else {
      setx(clientX);
      sety(clientY);
      setCol(color);
      setIsDrawing(true);
    }
    setFirstClick(!firstClick);
    setRectangle(array);
    if (!firstClick) setIsDrawing(false);
  }

  function handleMove({ clientX, clientY }) {
    let array = [...rectangle];
    if (firstClick) {
      // Calculate width and height as absolute values
      let width = Math.abs(clientX - x);
      let height = Math.abs(clientY - y);
      
      // Calculate the actual x and y coordinates based on the direction of drawing
      let actualX = Math.min(x, clientX);
      let actualY = Math.min(y, clientY);

      let idx = array.length ? array.length - 1 : 0;
      array[idx] = { 
        color: col, 
        height, 
        width, 
        x: actualX, 
        y: actualY,
        rotation: Math.random() * 5 - 2.5,
        scale: 1,
        opacity: 0.7
      };
    }
    setRectangle(array);
  }

  function handleRectHover(index) {
    setHoveredRect(index);
  }

  function handleRectLeave() {
    setHoveredRect(null);
  }

  return (
    <div className="App">
      <div className="controls">
        <h1>Rectangle Drawer</h1>
        <p>Click and drag to draw rectangles. Press C to clear.</p>
        <div className="stats">
          <span>Rectangles: {rectangle.length}</span>
          <button onClick={clearRectangles}>Clear All</button>
        </div>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }}
      >
        <Layer>
          {!!rectangle?.length &&
            rectangle.map((e, index) => {
              return (
                <Group 
                  key={index} 
                  x={e.x} 
                  y={e.y}
                  rotation={e.rotation}
                  scaleX={hoveredRect === index ? 1.05 : e.scale}
                  scaleY={hoveredRect === index ? 1.05 : e.scale}
                  onMouseEnter={() => handleRectHover(index)}
                  onMouseLeave={handleRectLeave}
                >
                  <Rect
                    noise={1}
                    opacity={hoveredRect === index ? 0.9 : e.opacity}
                    stroke="black"
                    shadowBlur={hoveredRect === index ? 10 : 5}
                    shadowColor="rgba(0,0,0,0.3)"
                    fill={e.color}
                    width={e.width}
                    strokeWidth={1}
                    height={e.height}
                    filters={[Konva.Filters.Noise]}
                    cornerRadius={8}
                    shadowOffset={{ x: 0, y: 2 }}
                  />
                </Group>
              );
            })}
          {isDrawing && (
            <Text
              text="Drawing..."
              x={10}
              y={10}
              fontSize={16}
              fill="#666"
              shadowColor="white"
              shadowBlur={5}
            />
          )}
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
