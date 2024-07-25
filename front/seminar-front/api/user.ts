import httpClient from './httpClient';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export async function createUser(requestBody: IFormInput): Promise<String> {
  try {
    const response = await httpClient.post('', requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
}
