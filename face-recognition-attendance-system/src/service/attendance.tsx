import axios from "axios";

// Function that takes URL and params as input
export const markAttendance = async (employeeId) => {
  try {
    const response : any = await axios.post("http://localhost:3000/api/attendances", {
      employeeId,
    });
    return {...response.data, success:response?.success}; // Return the data for further use
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow or handle here
  }
};
