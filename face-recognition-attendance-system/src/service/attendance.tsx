import axios from 'axios';

// Function that takes URL and params as input
export const fetchAllEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees/');
    return response.data; // Return the data for further use
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Optionally rethrow or handle here
  }
};
