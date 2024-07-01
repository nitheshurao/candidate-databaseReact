import axios from 'axios';
import data from './dumm.json'
const BASE_URL = 'http://localhost:5000'; // Your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCandidates = async (props) => {
  const response = await api.get(`/candidates?page=${props?.currentPage}&limit=${props?.limit}`);
  console.log("____res",props);
  return response;
};

export const addCandidate = async (candidateData) => {
    console.log("__addd",candidateData);
  const response =  await api.post('/candidates', candidateData);
  return response.data;
};

// Implement other CRUD operations (update, delete) as needed
