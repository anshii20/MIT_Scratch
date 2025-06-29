import React from "react";
import { useAppContext } from "../context/AppContext";

export default function MidArea() {
  const { state, dispatch } = useAppContext();

  const handleDrop = (e) => {
    e.preventDefault();
    const animationData = e.dataTransfer.getData('animation');
    if (animationData) {
      const animation = JSON.parse(animationData);
      dispatch({
        type: 'ADD_ANIMATION',
        payload: animation
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeAnimation = (index) => {
    dispatch({
      type: 'REMOVE_ANIMATION',
      payload: index
    });
  };

  const getAnimationDisplayText = (animation) => {
    switch (animation.type) {
      case 'move':
        return `Move ${animation.steps} steps`;
      case 'turn':
        return `Turn ${animation.degrees} degrees`;
      case 'goto':
        return `Go to x: ${animation.x} y: ${animation.y}`;
      case 'say':
        return `Say "${animation.text}" for ${animation.duration}s`;
      case 'think':
        return `Think "${animation.text}" for ${animation.duration}s`;
      case 'repeat':
        return `Repeat ${animation.times} times`;
      default:
        return 'Unknown animation';
    }
  };

  const getAnimationColor = (animation) => {
    switch (animation.type) {
      case 'move':
      case 'turn':
      case 'goto':
        return 'bg-blue-500';
      case 'say':
      case 'think':
        return 'bg-purple-500';
      case 'repeat':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedSprite = state.sprites.find(sprite => sprite.id === state.selectedSprite);

  return (
    <div className="flex-1 h-full overflow-auto flex flex-col">
      {/* Header with Sprite Selection and Play Button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-bold">Sprite Animations</h2>
          <select 
            value={state.selectedSprite}
            onChange={(e) => dispatch({ type: 'SELECT_SPRITE', payload: parseInt(e.target.value) })}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {state.sprites.map(sprite => (
              <option key={sprite.id} value={sprite.id}>
                {sprite.name} {sprite.heroMode && '⚡'}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_HERO_MODE' })}
            className={`px-4 py-2 rounded font-bold transition-colors ${
              state.heroModeActive 
                ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-600' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ⚡ Hero Mode
          </button>
          <button
            onClick={() => dispatch({ type: 'START_ANIMATION' })}
            disabled={state.isPlaying}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ▶ Play
          </button>
          <button
            onClick={() => dispatch({ type: 'STOP_ANIMATION' })}
            disabled={!state.isPlaying}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ⏹ Stop
          </button>
        </div>
      </div>

      {/* Animation Drop Zone */}
      <div 
        className="flex-1 p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="min-h-full border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center text-gray-500 mb-4">
            Drag animations here from the sidebar
          </div>
          
          {/* Animations List */}
          <div className="space-y-2">
            {selectedSprite && selectedSprite.animations.map((animation, index) => (
              <div 
                key={index}
                className={`${getAnimationColor(animation)} text-white px-3 py-2 rounded flex justify-between items-center ${
                  selectedSprite.heroMode ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <span className="text-sm">
                  {getAnimationDisplayText(animation)}
                  {selectedSprite.heroMode && ' ⚡'}
                </span>
                <button
                  onClick={() => removeAnimation(index)}
                  className="text-white hover:text-red-200 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Collision Notification */}
          {state.collisionDetected && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
              🎉 Collision detected! Animations have been swapped between sprites!
            </div>
          )}

          {/* Hero Mode Info */}
          {state.heroModeActive && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
              ⚡ Hero Mode Active: Sprites have enhanced animations and special effects!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
