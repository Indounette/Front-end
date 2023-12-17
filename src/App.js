import React, { useEffect } from 'react';
import Display from './components/pages/Display';
import Home from './components/pages/Home';
import Navbar from './components/tools/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './components/css/Home.css';


function AuthenticatedApp() {
  const { user, logout } = useAuth0();

  return (
    <div>
      <p>Hello {user.name}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    </div>
  );
}

function UnauthenticatedApp() {
  const { loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    // Redirect to login when the component mounts
    loginWithRedirect();
  }, 
  [loginWithRedirect]);
  return (
    null
  );
}

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log('isAuthenticated:', isAuthenticated);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/display" element={<Display />} />
  <Route
    path="/"
    element={isAuthenticated ? <Home /> : <UnauthenticatedApp />}
  />
</Routes>
    </Router>
  );
}

export default App;