import React from "react";

export default function PersonSprite() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="30" cy="15" r="12" fill="#FFB6C1" stroke="#333" strokeWidth="2"/>
      
      {/* Eyes */}
      <circle cx="26" cy="12" r="2" fill="#333"/>
      <circle cx="34" cy="12" r="2" fill="#333"/>
      
      {/* Smile */}
      <path d="M 24 18 Q 30 22 36 18" stroke="#333" strokeWidth="2" fill="none"/>
      
      {/* Body */}
      <rect x="25" y="27" width="10" height="25" fill="#4169E1" stroke="#333" strokeWidth="2"/>
      
      {/* Arms */}
      <rect x="15" y="30" width="8" height="3" fill="#4169E1" stroke="#333" strokeWidth="2"/>
      <rect x="37" y="30" width="8" height="3" fill="#4169E1" stroke="#333" strokeWidth="2"/>
      
      {/* Legs */}
      <rect x="26" y="52" width="4" height="20" fill="#8B4513" stroke="#333" strokeWidth="2"/>
      <rect x="30" y="52" width="4" height="20" fill="#8B4513" stroke="#333" strokeWidth="2"/>
      
      {/* Shoes */}
      <ellipse cx="28" cy="75" rx="5" ry="3" fill="#333"/>
      <ellipse cx="32" cy="75" rx="5" ry="3" fill="#333"/>
    </svg>
  );
} 