/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent } from 'react';
import { Camera, RefreshCcw, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const resetImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-zinc-900 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden bg-white">
      {/* Status Bar Mockup */}
      <div className="px-8 pt-6 pb-2 flex justify-between items-center text-[10px] font-bold text-zinc-400">
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-2 bg-zinc-300 rounded-sm"></div>
          <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
        </div>
      </div>

      {/* App Header */}
      <header className="px-8 py-4">
        <h1 className="text-2xl font-semibold text-zinc-900 leading-tight">Snap & Preview</h1>
        <p className="text-xs text-zinc-500 mt-1">Capture photos instantly to your library.</p>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 px-8 flex flex-col gap-4 relative justify-center">
        <AnimatePresence mode="wait">
          {!image ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="w-full h-full max-h-[400px] bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-center p-8 transition-colors"
            >
              <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center mb-4">
                <Camera size={24} className="text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-zinc-800">No image captured</p>
              <p className="text-xs text-zinc-400 mt-1">Your taken photo will appear here for review.</p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full max-h-[400px] relative group"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl bg-black flex items-center justify-center">
                <img
                  src={image}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={resetImage}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                id="reset-button"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        ref={fileInputRef}
        className="hidden"
        id="camera-input"
      />

      {/* Controls Area */}
      <footer className="p-8 pb-12 flex flex-col items-center gap-8 bg-white">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={triggerCamera}
            className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            id="capture-button"
          >
            <div className="w-14 h-14 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex w-full justify-around text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
          <button className="hover:text-zinc-900 transition-colors">Library</button>
          <button className="hover:text-zinc-900 transition-colors">Settings</button>
        </div>
      </footer>

      {/* Home Indicator */}
      <div className="h-1 w-32 bg-zinc-200 rounded-full mx-auto mb-2 opacity-50"></div>
    </div>
  );
}
