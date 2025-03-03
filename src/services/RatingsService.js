import axios from 'axios';

const BASE_URL = 'https://askybackend.onrender.com';

class RatingsService {
  static async getAllRatings() {
    try {
      const response = await axios.get(`${BASE_URL}/ratings`, {
        headers: {
          'accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ratings:', error);
      throw error;
    }
  }

  static async createRating(ratingData) {
    try {
      const response = await axios.post(`${BASE_URL}/ratings`, ratingData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating rating:', error);
      throw error;
    }
  }

  static async getRatingByAnswerId(answerId) {
    try {
      const response = await axios.get(`${BASE_URL}/ratings/answer/${answerId}`, {
        headers: {
          'accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching rating by answer ID:', error);
      throw error;
    }
  }
}

export default RatingsService;
