import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const spriteTypes = [
  { id: 'cat', name: 'Cat', component: 'CatSprite' },
  { id: 'person', name: 'Person', component: 'PersonSprite' },
  { id: 'robot', name: 'Robot', component: 'RobotSprite' },
  { id: 'alien', name: 'Alien', component: 'AlienSprite' }
];

const initialState = {
  sprites: [
    {
      id: 1,
      name: 'Cat',
      type: 'cat',
      x: 100,
      y: 100,
      rotation: 0,
      visible: true,
      animations: [],
      currentAnimationIndex: 0,
      isAnimating: false,
      speechBubble: null,
      thoughtBubble: null,
      heroMode: false
    }
  ],
  selectedSprite: 1,
  isPlaying: false,
  animationSpeed: 500, // milliseconds - faster animation
  collisionDetected: false,
  heroModeActive: false,
  spriteCounter: 1
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SPRITE': {
      const newSpriteType = spriteTypes[state.spriteCounter % spriteTypes.length];
      return {
        ...state,
        sprites: [...state.sprites, {
          id: Date.now(),
          name: `${newSpriteType.name} ${state.spriteCounter + 1}`,
          type: newSpriteType.id,
          x: Math.random() * 200 + 50,
          y: Math.random() * 100 + 50,
          rotation: 0,
          visible: true,
          animations: [],
          currentAnimationIndex: 0,
          isAnimating: false,
          speechBubble: null,
          thoughtBubble: null,
          heroMode: false
        }],
        spriteCounter: state.spriteCounter + 1
      };
    }
    case 'SELECT_SPRITE':
      return {
        ...state,
        selectedSprite: action.payload
      };
    case 'ADD_ANIMATION':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === state.selectedSprite
            ? { ...sprite, animations: [...sprite.animations, action.payload] }
            : sprite
        )
      };
    case 'REMOVE_ANIMATION':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === state.selectedSprite
            ? {
                ...sprite,
                animations: sprite.animations.filter((_, index) => index !== action.payload)
              }
            : sprite
        )
      };
    case 'UPDATE_SPRITE_POSITION':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, x: action.payload.x, y: action.payload.y }
            : sprite
        )
      };
    case 'UPDATE_SPRITE_ROTATION':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, rotation: action.payload.rotation }
            : sprite
        )
      };
    case 'SET_SPEECH_BUBBLE':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, speechBubble: action.payload.text }
            : sprite
        )
      };
    case 'SET_THOUGHT_BUBBLE':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, thoughtBubble: action.payload.text }
            : sprite
        )
      };
    case 'CLEAR_BUBBLES':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload
            ? { ...sprite, speechBubble: null, thoughtBubble: null }
            : sprite
        )
      };
    case 'START_ANIMATION':
      return {
        ...state,
        isPlaying: true,
        sprites: state.sprites.map(sprite => ({
          ...sprite,
          isAnimating: true,
          currentAnimationIndex: 0
        }))
      };
    case 'STOP_ANIMATION':
      return {
        ...state,
        isPlaying: false,
        sprites: state.sprites.map(sprite => ({
          ...sprite,
          isAnimating: false
        }))
      };
    case 'UPDATE_ANIMATION_INDEX':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, currentAnimationIndex: action.payload.index }
            : sprite
        )
      };
    case 'STOP_SPRITE_ANIMATION':
      return {
        ...state,
        sprites: state.sprites.map(sprite =>
          sprite.id === action.payload.id
            ? { ...sprite, isAnimating: false }
            : sprite
        )
      };
    case 'SWAP_ANIMATIONS': {
      // Swap animations and start playing the swapped animation immediately
      const sprites = [...state.sprites];
      const [sprite1Idx, sprite2Idx] = action.payload;
      const sprite1 = { ...sprites[sprite1Idx] };
      const sprite2 = { ...sprites[sprite2Idx] };
      
      // Only swap if both sprites have animations
      if (sprite1.animations.length > 0 || sprite2.animations.length > 0) {
        // Swap animations
        const tempAnimations = sprite1.animations;
        sprite1.animations = sprite2.animations;
        sprite2.animations = tempAnimations;
        
        // Reset animation index and set animating to true for both sprites
        sprite1.currentAnimationIndex = 0;
        sprite2.currentAnimationIndex = 0;
        sprite1.isAnimating = true;
        sprite2.isAnimating = true;
        
        // Replace in array
        sprites[sprite1Idx] = sprite1;
        sprites[sprite2Idx] = sprite2;
        
        return {
          ...state,
          sprites,
          isPlaying: true, // Start playing automatically
          collisionDetected: true,
          heroModeActive: true
        };
      }
      
      // If no animations to swap, just mark collision
      return {
        ...state,
        collisionDetected: true,
        heroModeActive: true
      };
    }
    case 'RESET_COLLISION':
      return {
        ...state,
        collisionDetected: false,
        sprites: state.sprites.map(sprite => ({
          ...sprite,
          heroMode: state.heroModeActive
        }))
      };
    case 'TOGGLE_HERO_MODE':
      return {
        ...state,
        heroModeActive: !state.heroModeActive,
        sprites: state.sprites.map(sprite => ({
          ...sprite,
          heroMode: !state.heroModeActive
        }))
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Animation loop
  useEffect(() => {
    if (!state.isPlaying) return;
    const interval = setInterval(() => {
      let allAnimationsComplete = true;
      state.sprites.forEach(sprite => {
        if (sprite.isAnimating && sprite.animations.length > 0) {
          const currentAnimation = sprite.animations[sprite.currentAnimationIndex];
          if (currentAnimation) {
            executeAnimation(sprite.id, currentAnimation);
            // Move to next animation
            const nextIndex = sprite.currentAnimationIndex + 1;
            if (nextIndex < sprite.animations.length) {
              dispatch({
                type: 'UPDATE_ANIMATION_INDEX',
                payload: { id: sprite.id, index: nextIndex }
              });
              allAnimationsComplete = false;
            } else {
              // Animation sequence complete for this sprite
              dispatch({
                type: 'STOP_SPRITE_ANIMATION',
                payload: { id: sprite.id }
              });
            }
          }
        }
      });
      
      // If all sprites have completed their animations, stop playing
      if (allAnimationsComplete) {
        dispatch({ type: 'STOP_ANIMATION' });
      }
      
      // Check for collisions
      checkCollisions();
    }, state.animationSpeed);
    return () => clearInterval(interval);
  }, [state.isPlaying, state.sprites, state.animationSpeed]);

  const executeAnimation = (spriteId, animation) => {
    const sprite = state.sprites.find(s => s.id === spriteId);
    if (!sprite) return;
    switch (animation.type) {
      case 'move': {
        const newX = sprite.x + Math.cos(sprite.rotation * Math.PI / 180) * animation.steps * 2;
        const newY = sprite.y + Math.sin(sprite.rotation * Math.PI / 180) * animation.steps * 2;
        dispatch({
          type: 'UPDATE_SPRITE_POSITION',
          payload: { id: spriteId, x: newX, y: newY }
        });
        break;
      }
      case 'turn': {
        dispatch({
          type: 'UPDATE_SPRITE_ROTATION',
          payload: { id: spriteId, rotation: sprite.rotation + animation.degrees }
        });
        break;
      }
      case 'goto': {
        dispatch({
          type: 'UPDATE_SPRITE_POSITION',
          payload: { id: spriteId, x: animation.x, y: animation.y }
        });
        break;
      }
      case 'say': {
        dispatch({
          type: 'SET_SPEECH_BUBBLE',
          payload: { id: spriteId, text: animation.text }
        });
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_BUBBLES',
            payload: spriteId
          });
        }, animation.duration * 1000);
        break;
      }
      case 'think': {
        dispatch({
          type: 'SET_THOUGHT_BUBBLE',
          payload: { id: spriteId, text: animation.text }
        });
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_BUBBLES',
            payload: spriteId
          });
        }, animation.duration * 1000);
        break;
      }
      default:
        break;
    }
  };

  const checkCollisions = () => {
    let anyCollision = false;
    for (let i = 0; i < state.sprites.length; i++) {
      for (let j = i + 1; j < state.sprites.length; j++) {
        const sprite1 = state.sprites[i];
        const sprite2 = state.sprites[j];
        const distance = Math.sqrt(
          Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2)
        );
        if (distance < 80) { // Increased collision distance for easier detection
          anyCollision = true;
          if (!state.collisionDetected) {
            dispatch({
              type: 'SWAP_ANIMATIONS',
              payload: [i, j]
            });
          }
        }
      }
    }
    // Only reset collision if sprites have moved far apart and no longer colliding
    if (state.collisionDetected && !anyCollision) {
      // Add a small delay before resetting to prevent immediate reset
      setTimeout(() => {
        dispatch({ type: 'RESET_COLLISION' });
      }, 1000);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, spriteTypes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 