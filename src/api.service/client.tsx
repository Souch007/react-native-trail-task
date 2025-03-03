import axios from 'axios'
import { BASE_URL, GET_INTERESTS } from '../constants/constants'

const create = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
      headers: {
        Authorization: "Jy8RZCXvvc6pZQUu2QZ2",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,de-DE;q=0.7,de;q=0.6",
        "Host": "be-v2.convose.com"
      },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => { 
      if (error.response?.status === 401) {
        console.log('Error');
      }
      return Promise.reject(error.response?.data || error.message);
    }
  );

  const getConvoseInterestrs = async (params: InterestDataType): Promise<AutocompleteResponse> => {
    return new Promise((resolve, reject) => {
      if (typeof params.limit === 'undefined') {
        throw new Error('limit parameter is required');
      }
      const queryParams = {
        q: params.q || "", 
        limit: Math.min(params.limit, 30),
        from: params.from || 0,
      };
      api.get(GET_INTERESTS, {
        params: queryParams
      }).then((response) => {
        if (response.status == 200) {
          resolve(response.data)
        }
      }
      ).catch((error) => {
        reject(error)
      });
    });
  }

  return {
    getConvoseInterestrs
  };
};

export default { create };
