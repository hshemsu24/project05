import React from 'react';

const DogCard = ({ dog }) => {
  return (
    <div className="dog-card">
      <img src={dog.url} alt={dog.breeds[0].name} />
      <h3>{dog.breeds[0].name}</h3>
    </div>
  );
};

export default DogCard;