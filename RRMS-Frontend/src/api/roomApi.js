import axios from "./axiosInstance";

export const getRooms = () => {
  return axios.get("/api/rooms");
};

export const getRoomById = (id) => {
  return axios.get(`/api/rooms/${id}`);
};

export const createRoom = (roomData) => {
  return axios.post("/api/rooms", roomData);
};

export const updateRoom = (id, roomData) => {
  return axios.put(`/api/rooms/${id}`, roomData);
};

export const deleteRoom = (id) => {
  return axios.delete(`/api/rooms/${id}`);
};