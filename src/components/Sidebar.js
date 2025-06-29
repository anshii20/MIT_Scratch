import React, { useState } from "react";
import Icon from "./Icon";
import { useAppContext } from "../context/AppContext";

export default function Sidebar() {
  const { dispatch } = useAppContext();
  const [animationInputs, setAnimationInputs] = useState({
    moveSteps: 10,
    turnDegrees: 15,
    gotoX: 0,
    gotoy: 0,
    sayText: "Hello!",
    sayDuration: 2,
    thinkText: "Hmm...",
    thinkDuration: 2,
    repeatTimes: 1
  });

  const handleInputChange = (field, value) => {
    setAnimationInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAnimation = (animation) => {
    dispatch({
      type: 'ADD_ANIMATION',
      payload: animation
    });
  };

  const handleDragStart = (e, animation) => {
    e.dataTransfer.setData('animation', JSON.stringify(animation));
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* Events Section */}
      <div className="font-bold text-lg mb-2">Events</div>
      <div 
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, { type: 'event', name: 'whenFlagClicked' })}
      >
        When <Icon name="flag" size={15} className="text-green-600 mx-2" /> clicked
      </div>
      <div 
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, { type: 'event', name: 'whenSpriteClicked' })}
      >
        When this sprite clicked
      </div>

      {/* Motion Section */}
      <div className="font-bold text-lg mb-2 mt-4">Motion</div>
      
      {/* Move Steps */}
      <div className="flex flex-col bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'move', 
            steps: animationInputs.moveSteps 
          })}
        >
          Move <input 
            type="number" 
            value={animationInputs.moveSteps}
            onChange={(e) => handleInputChange('moveSteps', parseInt(e.target.value) || 0)}
            className="w-12 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> steps
        </div>
      </div>

      {/* Turn Degrees */}
      <div className="flex flex-col bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'turn', 
            degrees: animationInputs.turnDegrees 
          })}
        >
          Turn <Icon name="undo" size={15} className="text-white mx-1" />
          <input 
            type="number" 
            value={animationInputs.turnDegrees}
            onChange={(e) => handleInputChange('turnDegrees', parseInt(e.target.value) || 0)}
            className="w-12 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> degrees
        </div>
      </div>

      <div className="flex flex-col bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'turn', 
            degrees: -animationInputs.turnDegrees 
          })}
        >
          Turn <Icon name="redo" size={15} className="text-white mx-1" />
          <input 
            type="number" 
            value={animationInputs.turnDegrees}
            onChange={(e) => handleInputChange('turnDegrees', parseInt(e.target.value) || 0)}
            className="w-12 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> degrees
        </div>
      </div>

      {/* Go to x: y: */}
      <div className="flex flex-col bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'goto', 
            x: animationInputs.gotoX, 
            y: animationInputs.gotoy 
          })}
        >
          Go to x: <input 
            type="number" 
            value={animationInputs.gotoX}
            onChange={(e) => handleInputChange('gotoX', parseInt(e.target.value) || 0)}
            className="w-12 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> y: <input 
            type="number" 
            value={animationInputs.gotoy}
            onChange={(e) => handleInputChange('gotoy', parseInt(e.target.value) || 0)}
            className="w-12 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Looks Section */}
      <div className="font-bold text-lg mb-2 mt-4">Looks</div>
      
      {/* Say */}
      <div className="flex flex-col bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'say', 
            text: animationInputs.sayText,
            duration: animationInputs.sayDuration
          })}
        >
          Say <input 
            type="text" 
            value={animationInputs.sayText}
            onChange={(e) => handleInputChange('sayText', e.target.value)}
            className="w-16 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> for <input 
            type="number" 
            value={animationInputs.sayDuration}
            onChange={(e) => handleInputChange('sayDuration', parseInt(e.target.value) || 1)}
            className="w-8 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> seconds
        </div>
      </div>

      {/* Think */}
      <div className="flex flex-col bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full">
        <div 
          className="flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, { 
            type: 'think', 
            text: animationInputs.thinkText,
            duration: animationInputs.thinkDuration
          })}
        >
          Think <input 
            type="text" 
            value={animationInputs.thinkText}
            onChange={(e) => handleInputChange('thinkText', e.target.value)}
            className="w-16 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> for <input 
            type="number" 
            value={animationInputs.thinkDuration}
            onChange={(e) => handleInputChange('thinkDuration', parseInt(e.target.value) || 1)}
            className="w-8 mx-1 text-black rounded px-1"
            onClick={(e) => e.stopPropagation()}
          /> seconds
        </div>
      </div>

      {/* Control Section */}
      <div className="font-bold text-lg mb-2 mt-4">Control</div>
      
      {/* Repeat */}
      <div 
        className="flex flex-row flex-wrap bg-orange-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, { type: 'repeat', times: animationInputs.repeatTimes })}
      >
        Repeat <input 
          type="number" 
          value={animationInputs.repeatTimes}
          onChange={(e) => handleInputChange('repeatTimes', parseInt(e.target.value) || 1)}
          className="w-8 mx-1 text-black rounded px-1"
          onClick={(e) => e.stopPropagation()}
        /> times
      </div>

      {/* Add Sprite Button */}
      <div className="font-bold text-lg mb-2 mt-4">Sprites</div>
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        onClick={() => dispatch({ type: 'ADD_SPRITE' })}
      >
        + Add Sprite
      </button>
    </div>
  );
}
