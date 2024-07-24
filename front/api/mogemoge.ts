import axios from 'axios';

export async function getRequest() {
  try {
    const response = await axios.get('http://localhost:3000/');
    return response.data;
  } catch (error) {
    console.error('There was a problem with the GET request:', error);
    throw error;
  }
}
