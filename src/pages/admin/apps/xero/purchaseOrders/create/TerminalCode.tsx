import { useEffect, useState } from "react";
import { loadingFrames } from "./loadingFrames";

// https://github.com/sindresorhus/cli-spinners
export default ({ lines, isLoading, clearLines }: { lines: string[]; isLoading?: boolean; clearLines: () => void }) => {
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingFrames.length);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const formatLine = (line: string, prefix: string) => {
    return line.split("\n").map((subline, index) => (
      <div key={index} className="flex gap-2 ml-2">
        {index === 0 ? (
          <span className="inline-block w-8 text-center" style={{ color: "#777" }}>
            {prefix}
          </span>
        ) : (
          <span className="inline-block w-8">{" ".repeat(prefix.length)}</span>
        )}
        <span className="flex-1">{subline}</span>
      </div>
    ));
  };

  return (
    <div className="mockup-code relative">
      <button
        onClick={clearLines}
        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
      >
        Clear
      </button>
      <pre>
        <code>
          {lines.map((line, index) => (
            <div key={index}>{formatLine(line, ">")}</div>
          ))}
          {isLoading && <div>{formatLine("", loadingFrames[loadingIndex])}</div>}
        </code>
      </pre>
    </div>
  );
};
