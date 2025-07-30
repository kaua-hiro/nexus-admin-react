import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-box">
        <strong>Oops! Algo deu errado.</strong>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;