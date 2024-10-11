// FetchDataFromPinata.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const cid = 'QmSzk7rL2vzT1nA1wGFqDuZGpWk1emF4Sos3V3Zq9WFcAh';

const FetchDataFromPinata = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
      console.log('Data fetched from Pinata:', response.data);
      onDataFetched(response.data); // Pass the fetched data to the parent component
    } catch (error) {
      console.error('Error fetching data from Pinata:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return null; // This component doesn't need to render anything directly
};

export default FetchDataFromPinata;
