import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import md5 from 'md5'; // Import the md5 library

function App() {
  const marvelAPI = 'http://gateway.marvel.com/v1/public/characters';
  const publicKey = '41af6e47ba1d11f527d42929ed19e4c5'; // Update with your public key
  const privateKey = '0e217e0052a197b51e70366d8716d465c65640c4'; // Update with your private key

  // Function to calculate the MD5 hash
  const generateHash = (ts) => {
    return md5(ts + privateKey + publicKey);
  };

  const fetchData = async () => {
    const ts = new Date().getTime().toString(); // Generate a timestamp
    const hash = generateHash(ts); // Calculate the hash

    const dataURL = `${marvelAPI}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    try {
      const response = await fetch(dataURL);
      const data = await response.json();

      console.log(data);
      //setData(data);
    } catch (error) {
      console.error(error); // Use console.error to log errors
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    </div>
  )
}

export default App;
