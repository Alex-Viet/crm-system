import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const fetchDesigners = async () => {
  try {
    const response = await axios.get(`${API_URL}designer/`);

    return response.data;
  } catch (error) {
    console.error('Error fetching designers:', error);
    throw error;
  }
};

export const fetchIssues = async () => {
  try {
    const response = await axios.get(`${API_URL}issue/`);

    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
};

export const fetchComments = async () => {
  try {
    const response = await axios.get(`${API_URL}comment/`, {
      params: {
        ordering: '-date_created',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
