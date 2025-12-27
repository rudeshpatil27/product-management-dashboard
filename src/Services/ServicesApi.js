import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";

export const getProducts = () => {
  return axios.get(BASE_URL);
};

export const addProduct = (product) => {
  return axios.post(BASE_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${BASE_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
