
import React, { useState } from "react";
import { Rnd } from "react-rnd";

const defaultWalls = [
  { id: "A", x: 50, y: 50, width: 400, height: 5 },
  { id: "B", x: 450, y: 50, width: 5, height: 300 },
  { id: "C", x: 50, y: 350, width: 405, height: 5 },
];

const defaultItems = [
  { id: 1, x: 100, y: 100, width: 60, height: 30, label: "B36" },
];

export default function KitchenDesigner() {
  const [walls, setWalls] = useState(defaultWalls);
  const [items, setItems] = useState(defaultItems);

  const handleDragStop = (e, d, id) => {
    setItems(items.map(item => (item.id === id ? { ...item, x: d.x, y: d.y } : item)));
  };

  const handleResizeStop = (e, direction, ref, delta, position, id) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      x: position.x,
      y: position.y
    } : item));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Kitchen Layout Tool</h2>
      <div
        className="relative border border-gray-400 bg-gray-50 shadow-md"
        style={{ width: 850, height: 650, padding: 20 }}
      >
        {walls.map(wall => (
          <div
            key={wall.id}
            className="absolute text-center text-white text-xs bg-gray-700 flex items-center justify-center shadow"
            style={{
              left: wall.x,
              top: wall.y,
              width: wall.width,
              height: wall.height
            }}
          >
            {`Wall ${wall.id}`}<br />
            {wall.width > wall.height ? `${wall.width}"` : `${wall.height}"`}
          </div>
        ))}

        {items.map(item => (
          <Rnd
            key={item.id}
            size={{ width: item.width, height: item.height }}
            position={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => handleDragStop(e, d, item.id)}
            onResizeStop={(e, dir, ref, delta, pos) => handleResizeStop(e, dir, ref, delta, pos, item.id)}
            bounds="parent"
          >
            <div className="border border-blue-600 bg-blue-100 h-full w-full flex items-center justify-center font-semibold shadow-md cursor-move">
              {item.label}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
