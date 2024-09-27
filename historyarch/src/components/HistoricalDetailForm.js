// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HistoricalDetailForm = () => {
//   const [formData, setFormData] = useState({
//     monument_id: '',
//     event_name: '',
//     event_date: '',
//     details: '',
//   });
//   const [message, setMessage] = useState('');
//   const [selectedDetailId, setSelectedDetailId] = useState(null);
//   const [historicalDetails, setHistoricalDetails] = useState([]);

//   useEffect(() => {
//     fetchHistoricalDetails();
//   }, []);

//   const fetchHistoricalDetails = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/historical-details/all');
//       setHistoricalDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching historical details:', error);
//       setMessage('Error fetching historical details.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedDetailId) {
//       await handleUpdate(selectedDetailId);
//     } else {
//       await handleAdd();
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       await axios.post('http://localhost:3000/api/historical-details/add', formData);
//       setMessage('Historical detail added successfully!');
//       resetForm();
//       fetchHistoricalDetails();
//     } catch (error) {
//       setMessage('Error adding historical detail. Please try again.');
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/historical-details/update/${id}`, formData);
//       setMessage('Historical detail updated successfully!');
//       resetForm();
//       fetchHistoricalDetails();
//     } catch (error) {
//       setMessage('Error updating historical detail. Please try again.');
//     }
//   };

//   const handleEditClick = (detail) => {
//     setSelectedDetailId(detail.id);
//     setFormData({
//       monument_id: detail.monument_id,
//       event_name: detail.event_name,
//       event_date: detail.event_date,
//       details: detail.details,
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/historical-details/delete/${id}`);
//       setMessage('Historical detail deleted successfully!');
//       fetchHistoricalDetails();
//     } catch (error) {
//       setMessage('Error deleting historical detail. Please try again.');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       monument_id: '',
//       event_name: '',
//       event_date: '',
//       details: '',
//     });
//     setSelectedDetailId(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Manage Historical Details</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1">Monument ID</label>
//           <input
//             type="number"
//             name="monument_id"
//             value={formData.monument_id}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Event Name</label>
//           <input
//             type="text"
//             name="event_name"
//             value={formData.event_name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Event Date</label>
//           <input
//             type="date"
//             name="event_date"
//             value={formData.event_date}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Details</label>
//           <textarea
//             name="details"
//             value={formData.details}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             {selectedDetailId ? 'Update Historical Detail' : 'Add Historical Detail'}
//           </button>
//         </div>
//       </form>
//       {message && <p className="text-center mt-4 text-green-600 font-semibold">{message}</p>}

//       <h3 className="text-xl font-bold mt-8 mb-4">Historical Details List</h3>
//       <ul className="space-y-4">
//         {historicalDetails.map((detail) => (
//           <li
//             key={detail.id}
//             className="p-4 bg-gray-100 rounded-md shadow flex justify-between items-center"
//           >
//             <div>
//               <p className="font-bold">{detail.event_name}</p>
//               <p className="text-gray-600">Date: {detail.event_date}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEditClick(detail)}
//                 className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(detail.id)}
//                 className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HistoricalDetailForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming you have a Navbar component for consistency

const HistoricalDetailForm = () => {
  const [formData, setFormData] = useState({
    monument_id: '',
    event_name: '',
    event_date: '',
    details: '',
  });
  const [message, setMessage] = useState('');
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [historicalDetails, setHistoricalDetails] = useState([]);

  useEffect(() => {
    fetchHistoricalDetails();
  }, []);

  const fetchHistoricalDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/historical-details/all');
      setHistoricalDetails(response.data);
    } catch (error) {
      console.error('Error fetching historical details:', error);
      setMessage('Error fetching historical details.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDetailId) {
      await handleUpdate(selectedDetailId);
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/historical-details/add', formData);
      setMessage('Historical detail added successfully!');
      resetForm();
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error adding historical detail. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/historical-details/update/${id}`, formData);
      setMessage('Historical detail updated successfully!');
      resetForm();
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error updating historical detail. Please try again.');
    }
  };

  const handleEditClick = (detail) => {
    setSelectedDetailId(detail.id);
    setFormData({
      monument_id: detail.monument_id,
      event_name: detail.event_name,
      event_date: detail.event_date,
      details: detail.details,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/historical-details/delete/${id}`);
      setMessage('Historical detail deleted successfully!');
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error deleting historical detail. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      monument_id: '',
      event_name: '',
      event_date: '',
      details: '',
    });
    setSelectedDetailId(null);
  };

  return (
    <div>
      <Navbar /> {/* Assuming a Navbar component for navigation */}
      <h2 className="ml-8 mt-10 text-3xl font-semibold text-blue-600 mb-4">Manage Historical Details</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="ml-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-lg">Monument ID</span>
              <input
                type="number"
                name="monument_id"
                value={formData.monument_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Event Name</span>
              <input
                type="text"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Event Date</span>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Details</span>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {selectedDetailId ? 'Update Historical Detail' : 'Add Historical Detail'}
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>

        {/* List Section */}
        <div className="mr-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Historical Details List</h3>
          <ul className="space-y-4">
            {historicalDetails.map((detail) => (
              <li key={detail.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-lg">
                  {detail.event_name} (Date: {detail.event_date}) - {detail.details}
                </span>
                <div>
                  <button
                    onClick={() => handleEditClick(detail)}
                    className="mr-2 bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(detail.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDetailForm;
