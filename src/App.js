import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import BookingForm from './BookingForm';
import BookingsTable from './BookingsTable';

function App() {
  const [userEmail, setUserEmail] = useState(null);

  const handleLogin = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    if (decoded.email === process.env.REACT_APP_ADMIN_EMAIL) {
      setUserEmail(decoded.email);
    } else {
      alert("Access denied");
    }
  };

  return (
    <div>
      {!userEmail ? (
        <GoogleLogin onSuccess={handleLogin} onError={() => alert("Login Failed")} />
      ) : (
        <>
          <h2>Welcome {userEmail}</h2>
          <BookingForm />
          <BookingsTable />
        </>
      )}
    </div>
  );
}

export default function Wrapper() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
}