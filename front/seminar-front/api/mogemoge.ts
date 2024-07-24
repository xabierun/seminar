import axios from 'axios';
import { headers } from 'next/headers';
import httpClient from './httpClient';

export async function getRequest() {
  try {
    const response = await httpClient.get('');

    return response.data;
  } catch (error) {
    console.error('There was a problem with the GET request:', error);
    throw error;
  }
}

// export async function postRequest() {
//   try {
//     const response = await axios.post("http://localhost:3000/", {
//       headers: { "Access-Control-Allow-Origin": "*" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("There was a problem with the GET request:", error);
//     throw error;
//   }
// }
