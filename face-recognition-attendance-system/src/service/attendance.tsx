import axios from "axios";

// Function that takes URL and params as input
export const markAttendance = async (employeeId) => {
  try {
    const response : any = await axios.post("http://localhost:3000/api/attendances", {
      employeeId,
    });
    return {...response.data}; // Return the data for further use
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow or handle here
  }
};

export const getDashboardData = async () => {
  try {
    const response : any = await axios.get("http://localhost:3000/api/attendances/employee-count");
    return {...response.data}; // Return the data for further use
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow or handle here
  }
};

export const fetchAttendance = async (startDate, endDate) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/attendances?startDate=${startDate}&endDate=${endDate}`);
    return response.data; // Return the data for further use
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow or handle here
  }
};