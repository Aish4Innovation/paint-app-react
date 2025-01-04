import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "./App.css";

function App() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const [isEraser, setIsEraser] = useState(false); 

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);

    // Function for starting the drawing
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    // Function to handle the drawing or erasing
    const draw = (e) => {
        if (!isDrawing) return;

        const ctx = ctxRef.current;

        // Set the stroke color to white if in eraser mode
        if (isEraser) {
            ctx.strokeStyle = "white"; // Or set this to match the background color
        } else {
            ctx.strokeStyle = lineColor;
        }

        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
    };

    return (
        <div className="App">
            <h1>REACT SKETCH</h1>
            <div className="draw-area">
                <Menu
                    setLineColor={setLineColor}
                    setLineWidth={setLineWidth}
                    setLineOpacity={setLineOpacity}
                    setIsEraser={setIsEraser}
                    isEraser={isEraser} 
                />
                <button onClick={clearCanvas}>New Page</button>
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    width="1280px"
                    height="720px"
                    style={{ border: "1px solid black" }}
                />
            </div>
        </div>
    );
}

export default App;
