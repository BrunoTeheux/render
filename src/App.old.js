import React, { useState, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import html2canvas from 'html2canvas';

const LatexRenderer = () => {
  const [equation, setEquation] = useState('f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi');
  const [status, setStatus] = useState(null);
  const renderedEqRef = useRef(null);

  const renderEquation = () => {
    try {
      const html = katex.renderToString(equation, {
        throwOnError: false,
        displayMode: true,
      });
      return { __html: html };
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
      return { __html: '' };
    }
  };

  const copyToClipboard = async () => {
    if (renderedEqRef.current) {
      try {
        const canvas = await html2canvas(renderedEqRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const bbox = getBoundingBox(imageData);
        
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = bbox.width;
        croppedCanvas.height = bbox.height;
        const croppedCtx = croppedCanvas.getContext('2d');
        croppedCtx.putImageData(
          ctx.getImageData(bbox.left, bbox.top, bbox.width, bbox.height),
          0, 0
        );

        croppedCanvas.toBlob((blob) => {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        });
        setStatus({ type: 'success', message: 'Image copied to clipboard!' });
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to copy image: ' + err.message });
      }
    }
  };

  const getBoundingBox = (imageData) => {
    let minX = imageData.width, minY = imageData.height, maxX = 0, maxY = 0;
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
        if (alpha !== 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    return {
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">LaTeX Equation Renderer</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Enter LaTeX Equation</label>
                  <textarea
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    rows="4"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Enter LaTeX equation..."
                  />
                </div>
                <div 
                  ref={renderedEqRef}
                  className="px-4 py-5 bg-white sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md overflow-x-auto"
                  dangerouslySetInnerHTML={renderEquation()} 
                />
                <div className="pt-4 flex items-center space-x-4">
                  <button 
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={copyToClipboard}
                  >
                    Copy to Clipboard
                  </button>
                </div>
                {status && (
                  <div className={`mt-3 text-center ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                    {status.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatexRenderer;
