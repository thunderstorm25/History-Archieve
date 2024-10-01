import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './hd.css';

const HistoricalDetailsPage = () => {
  const { monumentId } = useParams(); // Get the monument ID from the URL params
  const [historicalDetails, setHistoricalDetails] = useState([]);

  // Fetch historical details for the selected monument
  const fetchHistoricalDetails = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/historical-details/historical-details', {
        monumentId,  // Send only the monumentId
      });
      // Sort the historical details by event_date
      const sortedDetails = response.data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setHistoricalDetails(sortedDetails);
    } catch (error) {
      console.error('Error fetching historical details:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalDetails();
  }, []); // Fetch details on component mount

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Timeline:</h2>

        <div className="timeline">
          {historicalDetails.length > 0 ? (
            historicalDetails.map((detail, index) => (
              <div key={detail.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <h3 className="text-lg font-bold">{detail.event_name || 'Unnamed Event'}</h3>
                  <p className="text-sm text-gray-600">Date: {new Date(detail.event_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{detail.details || 'No details available'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No historical details found for this monument.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoricalDetailsPage;
