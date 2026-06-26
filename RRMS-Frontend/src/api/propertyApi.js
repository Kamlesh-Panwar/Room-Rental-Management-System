import axios from "../api/axiosInstance";

const API = "/properties";

export const getProperties = () =>
  axios.get(API);

export const getPropertyById = (id) =>
  axios.get(`${API}/${id}`);

export const createProperty = (data) =>
  axios.post(API, data);

export const updateProperty = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteProperty = (id) =>
  axios.delete(`${API}/${id}`);