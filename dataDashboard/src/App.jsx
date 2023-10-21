import React, { useState, useEffect } from 'react';
import './App.css';
import DogCard from './components/DogCard';

const App = () => {
  const dogAPI = 'https://api.thedogapi.com/v1/images/search';
  const apiKey = 'live_g3s9htKNucTNbUxjq0Umn9VmKQ0x7Wo7BfKgDL0POvLv2HhBgTpLunUaWQoqEVrE';

  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All'); // Initialize with 'All'

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${dogAPI}?has_breeds=1&limit=10&api_key=${apiKey}`);
        const data = await response.json();
        setDogs(data);
        setFilteredDogs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const totalDogs = dogs.length;
  const totalFilteredDogs = filteredDogs.length;

  // Create a list of available dog breeds
  const availableBreeds = [...new Set(dogs.map((dog) => dog.breeds[0].name))];

  const handleSearch = () => {
    const filteredResults = dogs.filter((dog) => {
      return (
        (dog.breeds[0].name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
        (selectedBreed === 'All' || dog.breeds[0].name === selectedBreed)
      );
    });
    setFilteredDogs(filteredResults);
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  return (
    <div className="main_container">
      <div className="header">
        <h1>Paw-some Dogs!</h1>
        <h4>Discover the coolest dogs in the world!</h4>
      </div>
      <div className="main_content">
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search by breed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select value={selectedBreed} onChange={handleBreedChange}>
            <option value="All">All Breeds</option>
            {availableBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        
        <div className="dog-card-container">
          <ul>
            {filteredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
