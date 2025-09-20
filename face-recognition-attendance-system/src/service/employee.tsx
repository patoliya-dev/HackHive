import axios from "axios";

export const fetchAllEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/employees");
    return response.data; // Return the data for further use
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow or handle here
  }
};

export const addUser = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/employees/post",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (e) {
    console.error("Error: ", e);
    throw e;
  }
};

export const deleteUser = async (employeeId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/employees/delete?employeeId=${employeeId}`,
    );
    return res.data;
  } catch (e) {
    console.error("Error: ", e);
    throw e;
  }
};
