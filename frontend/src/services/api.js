import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
});

export async function getDashboard(githubUsername, leetcodeUsername, signal) {
  const response = await api.get(
    `/dashboard/${githubUsername}/${leetcodeUsername}`,
    { signal }
  );
  return response.data.data;
}
