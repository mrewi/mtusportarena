// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for props validation
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../firebaseConfig'; // Adjust the path to your firebase.js file

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    // If no user is logged in, redirect to sign-in page
    return <Navigate to="/student-week-football/admin-auth" />;
  }

  // If user is authenticated, render the children components (protected content)
  return children;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure that children prop is provided
};

export default ProtectedRoute;
