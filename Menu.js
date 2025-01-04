import React from "react";
import "./App.css";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, setIsEraser, isEraser }) => {
    return (
        <div className="Menu">
            <label>Brush Color </label>
            <input
                type="color"
                onChange={(e) => {
                    setLineColor(e.target.value);
                }}
            />
            <label>Brush Width </label>
            <input
                type="range"
                min="3"
                max="20"
                onChange={(e) => {
                    setLineWidth(e.target.value);
                }}
            />
            <label>Brush Opacity</label>
            <input
                type="range"
                min="1"
                max="100"
                onChange={(e) => {
                    setLineOpacity(e.target.value / 100);
                }}
            />
            <button
                onClick={() => setIsEraser(prev => !prev)} 
            >
                {isEraser ? "Switch to Brush" : "Switch to Eraser"}
            </button>
        </div>
    );
};

export default Menu;
