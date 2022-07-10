import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const navigate = useNavigate();

  const handleBtn = (event: React.SyntheticEvent) => {
    event?.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <h1>Budget Manager</h1>
      <hr />
      <p>
        <span>You changed pages!</span>
      </p>
      <div>
        <button type="button" onClick={handleBtn}>
          Previous Page
        </button>
      </div>
    </div>
  );
};

export default Page1;
