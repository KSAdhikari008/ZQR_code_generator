import { useRef, useState } from 'react'
import './App.css'
import { QRCodeCanvas } from 'qrcode.react';


function App() {

  const [text, setText] = useState('');
  const canvasRef = useRef(null);
  const hasContent = text.trim().length > 0;


  function downloadQR(){
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code.png";
    link.click();
  }

  return (

    <main className="app">
      <div className="container">

        <span>QR</span>

        <h1>Make it scannable.</h1>
        <p className="subtitle">
          Turn a link, note, or contact detail into a clean QR code.
        </p>

        <div className="input-section">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a link or type something..."
            aria-label="Text or URL for QR code"
          />

          {hasContent && (
            <button className="clear-btn" onClick={() => setText("")} type="button">
              Clear
            </button>
          )}
        </div>

        <div className={`qr-section${hasContent ? ' is-active' : ''}`}>
          {hasContent ? (
            <QRCodeCanvas
              ref={canvasRef}
              value={text.trim()}
              size={256}
              level="H"
              includeMargin
            />
          ) : (
            <div className="placeholder">
              <span className="placeholder-mark">+</span>
              <p>Your code will appear here</p>
            </div>
          )}
        </div>

        <button
          className="download-btn"
          onClick={downloadQR}
          disabled={!hasContent}
          type="button"
        >
          Download PNG <span aria-hidden="true">↓</span>
        </button>

        <p className="footer-note">Private by design. Nothing leaves your browser.</p>
      </div>
    </main>
  )
}

export default App