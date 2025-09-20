const attendanceModel = require('../models/attendanceModel');

const selectedField = {
  __v: false,
};

const createAttendance = async (doc) => {
  try {
    return attendanceModel.create(doc);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllAttendance = async (filter) => {
  try {
    return attendanceModel.find(filter);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAttendanceListByFilter = async (query) => {
  try {
    return attendanceModel.find(query);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneAttendanceByFilter = async (query) => {
  try {
    return attendanceModel.findOne(query);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAttendanceById = async (id, select = selectedField) => {
  try {
    return attendanceModel.findById(id, select);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAttendance = async (doc, id, options = { new: true, fields: selectedField }) => {
  try {
    return attendanceModel.findByIdAndUpdate(id, doc, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAttendance = async (id) => {
  try {
    return attendanceModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceListByFilter,
  getOneAttendanceByFilter,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
