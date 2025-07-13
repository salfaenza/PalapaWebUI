import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import BookingForm from './BookingForm';
import BookingsTable from './BookingsTable';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  const [userEmail, setUserEmail] = useState(null);

  const handleLogin = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    if (decoded.email === process.env.REACT_APP_ADMIN_EMAIL) {
      setUserEmail(decoded.email);
    } else {
      alert("Access denied");
      googleLogout();
    }
  };

  return (
    <Router>
      <Routes>
        {!userEmail ? (
          <Route path="*" element={
            <div style={{ padding: '2rem' }}>
              <h2>Please sign in</h2>
              <GoogleLogin onSuccess={handleLogin} onError={() => alert("Login Failed")} />
            </div>
          } />
        ) : (
          <>
            <Route path="/" element={
              <div style={{ padding: '2rem' }}>
                <h2>Welcome {userEmail}</h2>
                <BookingForm />
                <BookingsTable />
              </div>
            } />

            <Route path="/dashboard" element={
              <div style={{ padding: '2rem' }}>
                <h2>Dashboard for {userEmail}</h2>
                <BookingsTable />
              </div>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
