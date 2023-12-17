import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Display.css';

// Extracted components for better organization
const Line = ({ content, lineNumber, color }) => (
  <div className={`line ${color}`}>
    <span className="line-number">{lineNumber}</span>
    <span className="line-content">{content}</span>
  </div>
);

const ScanResultsTable = ({ toolOutputArray }) => {
  const getColorForLine = (line) => {
    if (line.includes('ERROR')) {
      return 'red';
    } else if (line.includes('SUCCESS')) {
      return 'green';
    } else {
      return 'black';
    }
  };

  return (
    <div className="custom-table">
      {toolOutputArray.map((line, index) => (
        <Line key={index} lineNumber={index + 1} content={line} color={getColorForLine(line)} />
      ))}
    </div>
  );
};

const Display = () => {
  const location = useLocation();
  const [toolOutputArray, setToolOutputArray] = useState(null);

  useEffect(() => {
    if (!location) {
      console.error("No location available");
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const toolOutputParam = searchParams.get('toolOutput');

    if (toolOutputParam) {
      try {
        const decodedToolOutputParam = decodeURIComponent(toolOutputParam);
        const parsedToolOutputArray = JSON.parse(decodedToolOutputParam);

        if (Array.isArray(parsedToolOutputArray)) {
          setToolOutputArray(parsedToolOutputArray);
        } else {
          console.error('Invalid toolOutputParam format: Not an array');
        }
      } catch (error) {
        console.error('Error decoding toolOutput:', error);
      }
    }
  }, [location]);

  return (
    <div className="scan-results-container">
      <h2>Scan Results</h2>
      {toolOutputArray && <ScanResultsTable toolOutputArray={toolOutputArray} />}
      {toolOutputArray !== undefined && toolOutputArray == null && <div>No data to display</div>}
    </div>
  );
};

export default Display;
