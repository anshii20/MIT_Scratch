import React, { useRef, useState } from "react";
import CatSprite from "./CatSprite";
import PersonSprite from "./PersonSprite";
import RobotSprite from "./RobotSprite";
import AlienSprite from "./AlienSprite";
import { useAppContext } from "../context/AppContext";

const SpriteComponent = ({ type }) => {
  switch (type) {
    case 'cat':
      return <CatSprite />;
    case 'person':
      return <PersonSprite />;
    case 'robot':
      return <RobotSprite />;
    case 'alien':
      return <AlienSprite />;
    default:
      return <CatSprite />;
  }
};

export default function PreviewArea() {
  const { state, dispatch } = useAppContext();
  const stageRef = useRef(null);
  const [dragging, setDragging] = useState(null); // { id, offsetX, offsetY }

  // Simple, classic stage size
  const stageWidth = 480;
  const stageHeight = 360;
  const spriteScale = 0.9;

  // Mouse event handlers for dragging
  const handleMouseDown = (e, sprite) => {
    if (e.button !== 0) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    const offsetX = e.clientX - stageRect.left - sprite.x;
    const offsetY = e.clientY - stageRect.top - sprite.y;
    setDragging({ id: sprite.id, offsetX, offsetY });
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    let newX = e.clientX - stageRect.left - dragging.offsetX;
    let newY = e.clientY - stageRect.top - dragging.offsetY;
    newX = Math.max(0, Math.min(stageWidth - 60, newX));
    newY = Math.max(0, Math.min(stageHeight - 80, newY));
    dispatch({
      type: "UPDATE_SPRITE_POSITION",
      payload: { id: dragging.id, x: newX, y: newY },
    });
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-lg font-bold mb-2">Stage</div>
      <div className="flex justify-center">
        <div
          ref={stageRef}
          className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm select-none"
          style={{ width: stageWidth, height: stageHeight, cursor: dragging ? 'grabbing' : 'default', transition: 'box-shadow 0.2s' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {state.sprites.map((sprite) => (
            <div
              key={sprite.id}
              className={`absolute transition-all duration-150 ${
                state.selectedSprite === sprite.id ? 'ring-2 ring-blue-400' : ''
              }`}
              style={{
                left: `${sprite.x}px`,
                top: `${sprite.y}px`,
                transform: `rotate(${sprite.rotation}deg) scale(${spriteScale})`,
                transformOrigin: 'top left',
                cursor: dragging && dragging.id === sprite.id ? 'grabbing' : 'grab',
                zIndex: 2,
                boxShadow: dragging && dragging.id === sprite.id ? '0 4px 16px 0 #a0aec0' : 'none',
                borderRadius: 8,
                transition: 'left 0.15s cubic-bezier(0.4,0,0.2,1), top 0.15s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)'
              }}
              onMouseDown={(e) => handleMouseDown(e, sprite)}
            >
              <div className="relative">
                <SpriteComponent type={sprite.type} />
                {sprite.speechBubble && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded px-2 py-1 shadow text-xs z-10">
                    {sprite.speechBubble}
                  </div>
                )}
                {sprite.thoughtBubble && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full px-2 py-1 shadow text-xs z-10">
                    {sprite.thoughtBubble}
                  </div>
                )}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">
                  {sprite.name}
                </div>
              </div>
            </div>
          ))}
          {state.collisionDetected && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-900 px-3 py-1 rounded shadow font-bold z-20 text-sm">
              HERO MODE: Animations Swapped!
            </div>
          )}
        </div>
      </div>
      {/* Sprite Info */}
      <div className="mt-4 space-y-2">
        <h3 className="font-bold text-sm">Sprite Information:</h3>
        {state.sprites.map((sprite) => (
          <div 
            key={sprite.id}
            className={`p-2 rounded text-xs ${
              state.selectedSprite === sprite.id 
                ? 'bg-blue-100 border border-blue-300' 
                : 'bg-gray-100'
            }`}
          >
            <div className="font-semibold flex items-center">
              {sprite.name}
            </div>
            <div>Type: {sprite.type}</div>
            <div>Position: ({Math.round(sprite.x)}, {Math.round(sprite.y)})</div>
            <div>Rotation: {Math.round(sprite.rotation)}°</div>
            <div>Animations: {sprite.animations.length}</div>
            {sprite.isAnimating && (
              <div className="text-green-600 font-semibold">▶ Playing</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
