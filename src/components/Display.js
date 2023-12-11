import React from 'react';
import './Display.css'; // Import the CSS file

const Display = ({ toolOutput }) => {
  console.log(toolOutput);

  const getColorForLine = (line) => {
    // Customize this logic based on the content of your toolOutput
    if (line.includes('ERROR')) {
      return 'red';
    } else if (line.includes('SUCCESS')) {
      return 'green';
    } else {
      return 'black';
    }
  };

  return (
    <div>
      <h2>Scan Results</h2>
      <table className="multicolored-table"> {/* Add a class for styling */}
        <thead>
          <tr>
            <th>Line Number</th>
            <th>Line Content</th>
          </tr>
        </thead>
        <tbody>
          {toolOutput.map((line, index) => (
            <tr key={index} style={{ color: getColorForLine(line) }}>
              <td>{index + 1}</td>
              <td>{line}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
