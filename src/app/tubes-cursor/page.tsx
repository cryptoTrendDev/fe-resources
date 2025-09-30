"use client";

import React, { useEffect, useState } from "react";
// @ts-ignore
import TubesCursor from "threejs-components/build/cursors/tubes1.min.js";

type TubesCursorConfig = {
  tubes: {
    colors: string[];
    lights: {
      intensity: number;
      colors: string[];
    };
  };
};

type TubesCursorApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  destroy?: () => void;
};

export default function TubesCursorPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let app: TubesCursorApp | null = null;
    let clickHandler: ((event: Event) => void) | null = null;

    const initializeTubesCursor = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const canvas = document.getElementById("canvas");

        if (!canvas) {
          throw new Error("Canvas element not found");
        }

        if (typeof TubesCursor !== "function") {
          throw new Error(`TubesCursor is not a function: ${typeof TubesCursor}`);
        }

        const config: TubesCursorConfig = {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        };

        app = TubesCursor(canvas, config);

        function randomColors(count: number): string[] {
          return new Array(count).fill(0).map(
            () =>
              "#" +
              Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
          );
        }

        clickHandler = () => {
          if (app && app.tubes) {
            const colors = randomColors(3);
            const lightsColors = randomColors(4);
            console.log("Updating colors:", colors, lightsColors);

            if (typeof app.tubes.setColors === "function") {
              app.tubes.setColors(colors);
            }
            if (typeof app.tubes.setLightsColors === "function") {
              app.tubes.setLightsColors(lightsColors);
            }
          }
        };

        document.body.addEventListener("click", clickHandler);
        console.log("TubesCursor initialized successfully");
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize TubesCursor:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
        setIsLoading(false);
      }
    };

    initializeTubesCursor();

    // Cleanup function
    return () => {
      if (clickHandler) {
        document.body.removeEventListener("click", clickHandler);
      }
      if (app && typeof app.destroy === "function") {
        app.destroy();
      }

      // Clean up script tag if needed
      const existingScript = document.querySelector('script[src*="threejs-components"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="h-full relative">
        <div className="absolute inset-0">
          <canvas id="canvas" className="w-full h-full"></canvas>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-2.5 relative">
          {isLoading && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded">
              Loading TubesCursor...
            </div>
          )}

          {error && (
            <div className="absolute top-4 right-4 bg-red-500/50 text-white px-4 py-2 rounded max-w-sm">
              <div className="font-medium">Error loading TubesCursor:</div>
              <div className="text-sm">{error}</div>
              <div className="text-xs mt-1">Check the console for more details.</div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="text-white">
              <h1 className="text-7xl font-bold uppercase">Tubes</h1>
              <h2 className="text-6xl font-medium uppercase">Cursor</h2>
              <div className="absolute bottom-4 left-4 bg-green-500/50 text-white px-4 py-2 rounded text-sm">
                Click anywhere to change colors!
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
