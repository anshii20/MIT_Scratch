import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen w-full bg-blue-50 flex flex-row font-sans">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-row gap-8 w-full max-w-6xl py-8">
            {/* Animation Editor */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-w-[400px] max-w-[600px]">
              <MidArea />
            </div>
            {/* Preview Area */}
            <div className="w-[520px] bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <PreviewArea />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
