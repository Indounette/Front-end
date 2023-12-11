import React, { useState } from 'react';
import './Home.css';
import Display from './Display';

const Home = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [toolOutput, setToolOutput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/get_report_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ website_url: websiteUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log(data);
      setToolOutput(data.tool_output);
    } catch (error) {
      console.error(error.message);
    }

    // Move the redirect outside the try block
    
    
  };
  console.log('Before form rendering');
  return (
    <div>
      <h2>Web Vulnerability Scanner</h2>
      <div class="loading-screen" id="loadingScreen">
        <div class="loading-text">Loading...</div>
    </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="website_url">Enter Website URL:</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          required
        />
        <button type="submit">Scan Website</button>
      </form>

      {toolOutput && <Display toolOutput={toolOutput} />}
    </div>
  );
};

export default Home;
