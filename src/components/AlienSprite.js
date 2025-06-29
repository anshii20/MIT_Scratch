import React from "react";

export default function AlienSprite() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <ellipse cx="30" cy="20" rx="15" ry="18" fill="#90EE90" stroke="#333" strokeWidth="2"/>
      
      {/* Large Eyes */}
      <ellipse cx="24" cy="15" rx="4" ry="6" fill="#000080" stroke="#333" strokeWidth="1"/>
      <ellipse cx="36" cy="15" rx="4" ry="6" fill="#000080" stroke="#333" strokeWidth="1"/>
      <circle cx="24" cy="13" r="1" fill="#FFF"/>
      <circle cx="36" cy="13" r="1" fill="#FFF"/>
      
      {/* Small Mouth */}
      <ellipse cx="30" cy="28" rx="2" ry="1" fill="#FF69B4"/>
      
      {/* Antennae */}
      <line x1="25" y1="8" x2="22" y2="2" stroke="#333" strokeWidth="2"/>
      <line x1="35" y1="8" x2="38" y2="2" stroke="#333" strokeWidth="2"/>
      <circle cx="22" cy="2" r="2" fill="#FFD700"/>
      <circle cx="38" cy="2" r="2" fill="#FFD700"/>
      
      {/* Body */}
      <ellipse cx="30" cy="45" rx="12" ry="20" fill="#98FB98" stroke="#333" strokeWidth="2"/>
      
      {/* Arms */}
      <ellipse cx="18" cy="40" rx="4" ry="8" fill="#90EE90" stroke="#333" strokeWidth="2"/>
      <ellipse cx="42" cy="40" rx="4" ry="8" fill="#90EE90" stroke="#333" strokeWidth="2"/>
      
      {/* Hands */}
      <circle cx="16" cy="48" r="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      <circle cx="44" cy="48" r="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      
      {/* Legs */}
      <ellipse cx="25" cy="65" rx="3" ry="8" fill="#90EE90" stroke="#333" strokeWidth="2"/>
      <ellipse cx="35" cy="65" rx="3" ry="8" fill="#90EE90" stroke="#333" strokeWidth="2"/>
      
      {/* Feet */}
      <ellipse cx="25" cy="75" rx="4" ry="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      <ellipse cx="35" cy="75" rx="4" ry="3" fill="#FFD700" stroke="#333" strokeWidth="1"/>
      
      {/* Belly Button */}
      <circle cx="30" cy="50" r="2" fill="#FF69B4"/>
    </svg>
  );
} 