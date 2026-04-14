import React from "react";

const styles = `
  .loading-container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at 50% 60%, #fff5f7 0%, #fef0f4 40%, #fce8f0 100%);
  }

  .loading-circle {
    width: 60px;
    height: 60px;
    border: 4px solid #f0c4d4;
    border-top-color: #e8748a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;



const EnvelopeOpening: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="loading-container">
        <div className="loading-circle" />
      </div>
    </>
  );
};

export default EnvelopeOpening;