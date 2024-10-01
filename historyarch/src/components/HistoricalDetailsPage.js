import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './hd.css';  // Make sure you have appropriate CSS for the timeline

const HistoricalDetailsPage = () => {
  const { monumentId } = useParams();  // Get the monument ID from the URL
  const [historicalDetails, setHistoricalDetails] = useState([]);  // Store historical details

  // Fetch historical details based on the monumentId
  const fetchHistoricalDetails = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/historical-details/historical-details', {
        monumentId,  // Sending only monumentId as part of the request body
      });

      // Sort historical details by event date
      const sortedDetails = response.data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setHistoricalDetails(sortedDetails);  // Set the sorted historical details
    } catch (error) {
      console.error('Error fetching historical details:', error);
    }
  };

  // Function to convert the data to CSV and trigger download
  const exportToCSV = () => {
    if (!historicalDetails.length) return;

    // Prepare CSV data
    const headers = ['Event Name', 'Event Date', 'Details'];
    const csvRows = [
      headers.join(','),  // Add headers
      ...historicalDetails.map(detail => [
        "${detail.event_name || 'Unnamed Event'}",
        "${new Date(detail.event_date).toLocaleDateString()}",
        "${detail.details || 'No details available'}"
      ].join(','))  // Add each row of data
    ];

    // Create a Blob object representing the CSV data
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historical_details.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchHistoricalDetails();
  }, []);

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Historical Timeline</h2>

          {/* Export button next to the heading */}
          <button
            onClick={exportToCSV}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Export to CSV
          </button>
        </div>

        {/* Timeline Section */}
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
    </div >
    </>
  );
};

export default HistoricalDetailsPage;