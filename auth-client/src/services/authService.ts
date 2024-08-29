import axios from 'axios';

interface SignUpData {
  email: string;
  name: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}
const PORT  = process.env.AUTH_API_PORT || 3001;
const API_URL = `http://localhost:${PORT}/auth`;

const signUp = async (data: SignUpData) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

const signIn = async (data: SignInData) => {
  const response = await axios.post(`${API_URL}/signin`, data);
  return response.data;
};

export default {
  signUp,
  signIn,
};
