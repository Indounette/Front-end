import React, { useState, useEffect }  from 'react';
import Display from './Display';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import '../css/Button.css';
import CybersecurityVideo from '../media/Cybersecurity-bg.mp4';

const Home = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [toolOutput, setToolOutput] = useState(null);
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [toolOutputSent, setToolOutputSent] = useState(false);


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

      // Make sure data.tool_output is an array before setting the state
      if (Array.isArray(data.tool_output)) {
        setToolOutput(data.tool_output);
        setShouldNavigate(true);
        setToolOutputSent(true); // Set toolOutputSent to true when toolOutput is sent
      } else {
        console.error('Data is not in the expected array format');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Use this effect to handle navigation
  useEffect(() => {
    if (shouldNavigate) {
      // Directly navigate to the /display route with toolOutput as a URL parameter
      navigate(`/display?toolOutput=${encodeURIComponent(JSON.stringify(toolOutput))}`);
    }
  }, [shouldNavigate, navigate, toolOutput]);


  return (
    <div>
      <video src={CybersecurityVideo} autoPlay loop muted />
      <form onSubmit={handleSubmit}>
        <label htmlFor="website_url">Your Website URL Here:</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          required
        />
        <button type="submit" class="btn btn--outline">Scan Now !</button>
        {console.log("Data sent to Display:", toolOutput)}
        {toolOutputSent && <Display toolOutput={toolOutput} />}
      </form>
    </div>
  );
};

export default Home;
