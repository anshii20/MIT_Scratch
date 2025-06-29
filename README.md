# Scratch-like Animation Project

A React-based Scratch-like animation playground with drag-and-drop functionality, multiple sprites, collision-based animation swapping, and enhanced hero mode features.
Vercel Live Link --->  https://mit-scratch-mu.vercel.app/
Google Drive Link --->  https://drive.google.com/file/d/1bEDdoibOEPpjf826CP5Bdi0d0LYxl-ij/view?usp=drive_link

## Features Implemented

### 1. Motion Animations
- **Move ____ steps**: Move sprite forward/backward by specified number of steps
- **Turn ____ degrees**: Rotate sprite by specified degrees (clockwise/counter-clockwise)
- **Go to x: ___ y: ____**: Teleport sprite to specific coordinates
- **Repeat animation**: Loop animations multiple times

### 2. Looks Animations
- **Say ____ for ____ seconds**: Display speech bubble with text for specified duration
- **Think ____ for ____ seconds**: Display thought bubble with text for specified duration

### 3. Multiple Sprites Support
- Add multiple sprites to the stage with different character types
- Each sprite can have its own set of animations
- Select different sprites to edit their animations
- All sprites animate simultaneously when play button is clicked

### 4. Different Sprite Types
- **Cat**: Classic cat character with orange fur
- **Person**: Human character with blue clothing
- **Robot**: Metallic robot with glowing green eyes
- **Alien**: Green alien with large eyes and antennae

### 5. Hero Feature - Enhanced Collision-Based Animation Swap
- When two sprites collide (within 60px distance), their animations automatically swap
- **Hero Mode Activation**: Sprites enter hero mode with enhanced effects
- **Visual Effects**: Golden glow, pulsing animation, and special speech bubbles
- **Enhanced Animations**: Faster movement and rotation in hero mode
- **Manual Toggle**: Activate hero mode manually with the hero mode button
- Creates dynamic interaction between characters in the Scratch playground

### 6. Drag-and-Drop Interface
- Drag animations from the sidebar to the mid area
- Remove animations by clicking the × button
- Real-time preview of sprite positions and animations
- Visual feedback for selected sprites and hero mode

## How to Use

1. **Adding Animations**:
   - Select a sprite from the dropdown in the mid area
   - Drag animation blocks from the sidebar to the mid area
   - Customize parameters (steps, degrees, text, duration) in the sidebar

2. **Playing Animations**:
   - Click the "▶ Play" button to start all sprite animations
   - Click "⏹ Stop" to stop animations
   - Watch sprites move, rotate, and display speech/thought bubbles

3. **Adding Sprites**:
   - Click the "+ Add Sprite" button in the sidebar
   - New sprites appear at random positions on the stage
   - Different sprite types cycle automatically (Cat → Person → Robot → Alien)

4. **Hero Mode**:
   - **Automatic**: Triggered when sprites collide
   - **Manual**: Click the "⚡ Hero Mode" button to activate for all sprites
   - **Effects**: Enhanced animations, golden glow, special speech bubbles
   - **Duration**: Hero mode lasts for 3 seconds after collision

5. **Collision Detection**:
   - When sprites get close to each other, their animations will swap
   - A notification appears when collision occurs
   - Sprites enter hero mode with visual effects

## Technical Implementation

- **React Context**: State management for sprites, animations, and collision detection
- **SVG Sprites**: Custom-drawn characters with different personalities
- **CSS Animations**: Smooth transitions and hero mode effects
- **Tailwind CSS**: Styling and responsive design
- **Webpack**: Build system with hot reloading

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── CatSprite.js      # Original cat sprite
│   ├── PersonSprite.js   # Human character sprite
│   ├── RobotSprite.js    # Robot character sprite
│   ├── AlienSprite.js    # Alien character sprite
│   ├── Icon.js           # Icon component for sidebar
│   ├── MidArea.js        # Animation drop zone and controls
│   ├── PreviewArea.js    # Stage with sprites and visual feedback
│   └── Sidebar.js        # Animation blocks and sprite controls
├── context/
│   └── AppContext.js     # State management and animation logic
├── App.js                # Main application component
└── index.js              # Application entry point
```

## Animation Types

- **move**: Moves sprite in the direction it's facing (enhanced in hero mode)
- **turn**: Rotates sprite by specified degrees (enhanced in hero mode)
- **goto**: Teleports sprite to specific coordinates
- **say**: Shows speech bubble with text (special effects in hero mode)
- **think**: Shows thought bubble with text (special effects in hero mode)
- **repeat**: Loops animations multiple times

## Hero Mode Features

- **Enhanced Movement**: 1.5x faster movement and rotation
- **Visual Effects**: Golden glow and pulsing animation
- **Special Speech**: Speech bubbles with lightning emojis
- **Collision Trigger**: Automatically activated on sprite collision
- **Manual Control**: Toggle hero mode for all sprites
- **Duration**: 3-second duration after collision

## Future Enhancements

- Sound effects for animations and collisions
- More sprite costumes and character variations
- Advanced control blocks (if/else, loops, variables)
- Save and load animation projects
- Export animations as videos or GIFs
- Multiplayer collaboration features
- More collision effects and power-ups
- Sprite customization options
