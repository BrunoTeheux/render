import React, { useState, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import html2canvas from 'html2canvas';

// Parse markdown with inline and display math
const parseMarkdownWithMath = (text) => {
  const parts = [];
  let lastIndex = 0;

  // Match both $$ (display) and $ (inline), allowing newlines within expressions
  const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the math
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    // Add the math
    const isMath = match[0].startsWith('$$');
    const mathContent = match[0].slice(isMath ? 2 : 1, -(isMath ? 2 : 1));
    parts.push({
      type: isMath ? 'display-math' : 'inline-math',
      content: mathContent,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
};

// Render a markdown+math part to HTML
const renderPart = (part, index) => {
  if (part.type === 'text') {
    return part.content.split('\n').map((line, i) => (
      <React.Fragment key={`${index}-${i}`}>
        {line}
        {i < part.content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }

  try {
    const html = katex.renderToString(part.content, {
      throwOnError: false,
      displayMode: part.type === 'display-math',
    });

    if (part.type === 'inline-math') {
      return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
    } else {
      return <div key={index} className="my-4" dangerouslySetInnerHTML={{ __html: html }} />;
    }
  } catch (err) {
    return <span key={index} className="text-red-500">[Math Error]</span>;
  }
};

const LatexRenderer = () => {
  const [mode, setMode] = useState('html');
  const [htmlInput, setHtmlInput] = useState(`Here's an example:\n\nInline math: $E = mc^2$ is Einstein's famous equation.\n\nDisplay math:\n$$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi$$\n\nYou can mix text and equations!`);
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

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '90%'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
    color: '#111827'
  };

  const toggleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
    gap: '16px'
  };

  const buttonStyle = (isActive) => ({
    padding: '8px 24px',
    borderRadius: '6px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? '#3b82f6' : '#e5e7eb',
    color: isActive ? 'white' : '#374151',
  });

  const textareaStyle = {
    width: '100%',
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'monospace',
    resize: 'vertical',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: '500',
    display: 'block'
  };

  const previewStyle = {
    maxWidth: '600px',
    margin: '32px auto 0',
    backgroundColor: '#f9fafb',
    padding: '32px',
    borderRadius: '8px',
    fontSize: '18px',
    lineHeight: '1.8',
    fontFamily: 'Georgia, serif',
    color: '#1f2937'
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px'
  };

  const statusStyle = {
    marginTop: '12px',
    textAlign: 'center',
    fontSize: '14px',
    color: status?.type === 'error' ? '#ef4444' : '#10b981'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>LaTeX Renderer</h1>

        <div style={toggleContainerStyle}>
          <button
            onClick={() => setMode('html')}
            style={buttonStyle(mode === 'html')}
          >
            HTML Preview
          </button>
          <button
            onClick={() => setMode('image')}
            style={buttonStyle(mode === 'image')}
          >
            Image Export
          </button>
        </div>

        {mode === 'html' && (
          <div>
            <div>
              <label style={labelStyle}>Enter Markdown with LaTeX</label>
              <textarea
                style={textareaStyle}
                rows="8"
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Enter text with $inline math$ and $$display math$$..."
              />
              <p style={helperTextStyle}>Use $...$ for inline math and $$...$$ for display math</p>
            </div>

            <div style={previewStyle}>
              {parseMarkdownWithMath(htmlInput).map((part, idx) => renderPart(part, idx))}
            </div>
          </div>
        )}

        {mode === 'image' && (
          <div>
            <div>
              <label style={labelStyle}>Enter LaTeX Equation</label>
              <textarea
                style={textareaStyle}
                rows="4"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="Enter LaTeX equation..."
              />
            </div>

            <div
              ref={renderedEqRef}
              style={{
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                marginTop: '16px',
                overflowX: 'auto'
              }}
              dangerouslySetInnerHTML={renderEquation()}
            />

            <button
              style={{
                ...buttonStyle(true),
                width: '100%',
                padding: '12px',
                marginTop: '16px',
                fontSize: '16px'
              }}
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>

            {status && (
              <div style={statusStyle}>
                {status.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatexRenderer;
