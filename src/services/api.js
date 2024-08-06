import axios from "axios";
const BASE_URL = "https://654b872f5b38a59f28ef3e96.mockapi.io/api/v2/form";
export const apiService = {
  showAllForms,
  addNewForm,
  getFormData,
  updateFormData,
  deleteFormData
};

function showAllForms() {
  return axios.get(`${BASE_URL}`);
}

function addNewForm(body) {
  return axios.post(`${BASE_URL}`, body);
}

function getFormData(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

function updateFormData(id, body) {
  return axios.put(`${BASE_URL}/${id}`, body);
}
function deleteFormData(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}