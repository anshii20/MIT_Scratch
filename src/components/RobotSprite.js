import React from "react";

export default function RobotSprite() {
  return (
    <svg
      width="70"
      height="80"
      viewBox="0 0 70 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <rect x="20" y="10" width="30" height="25" fill="#C0C0C0" stroke="#333" strokeWidth="2"/>
      <rect x="22" y="12" width="26" height="21" fill="#E0E0E0" stroke="#333" strokeWidth="1"/>
      
      {/* Eyes */}
      <circle cx="28" cy="20" r="3" fill="#00FF00"/>
      <circle cx="42" cy="20" r="3" fill="#00FF00"/>
      <circle cx="28" cy="20" r="1" fill="#FFF"/>
      <circle cx="42" cy="20" r="1" fill="#FFF"/>
      
      {/* Mouth */}
      <rect x="30" y="28" width="10" height="3" fill="#FF0000"/>
      
      {/* Antenna */}
      <line x1="35" y1="10" x2="35" y2="5" stroke="#333" strokeWidth="2"/>
      <circle cx="35" cy="5" r="2" fill="#FF0000"/>
      
      {/* Body */}
      <rect x="25" y="35" width="20" height="30" fill="#808080" stroke="#333" strokeWidth="2"/>
      <rect x="27" y="37" width="16" height="26" fill="#A0A0A0" stroke="#333" strokeWidth="1"/>
      
      {/* Chest Panel */}
      <rect x="30" y="40" width="10" height="8" fill="#000080" stroke="#333" strokeWidth="1"/>
      <circle cx="35" cy="44" r="1" fill="#00FFFF"/>
      
      {/* Arms */}
      <rect x="15" y="38" width="8" height="4" fill="#C0C0C0" stroke="#333" strokeWidth="2"/>
      <rect x="47" y="38" width="8" height="4" fill="#C0C0C0" stroke="#333" strokeWidth="2"/>
      
      {/* Hands */}
      <circle cx="13" cy="40" r="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      <circle cx="57" cy="40" r="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      
      {/* Legs */}
      <rect x="28" y="65" width="6" height="12" fill="#C0C0C0" stroke="#333" strokeWidth="2"/>
      <rect x="36" y="65" width="6" height="12" fill="#C0C0C0" stroke="#333" strokeWidth="2"/>
      
      {/* Feet */}
      <rect x="26" y="77" width="10" height="3" fill="#333" stroke="#333" strokeWidth="1"/>
      <rect x="34" y="77" width="10" height="3" fill="#333" stroke="#333" strokeWidth="1"/>
    </svg>
  );
} 