
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
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Kitchen Layout Tool</h2>
      <div style={{ position: 'relative', width: 850, height: 650, background: '#f8f8f8', border: '1px solid #ccc', padding: 20 }}>
        {walls.map(wall => (
          <div
            key={wall.id}
            style={{
              position: "absolute",
              left: wall.x,
              top: wall.y,
              width: wall.width,
              height: wall.height,
              background: "#555",
              color: "#fff",
              fontSize: 10,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
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
            <div style={{
              height: "100%",
              width: "100%",
              background: "#e0ecff",
              border: "1px solid #339",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "move"
            }}>
              {item.label}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
