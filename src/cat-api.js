import axiosA from 'axios';

const axios = axiosA.create({
  baseURL: 'https://api.thecatapi.com/v1/breeds',
  headers: {
    'x-api-key':
      'live_PcpPMTnEA7ZX3j9dSb8CpvT6v2JDh7QTSrinh5deISQ3ca74ysUg7sDT3biL2NaZ',
  },
});

export function fetchBreeds() {
  return axios.get().then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  const baseUrl = 'https://api.thecatapi.com/v1/images/search';
  const PARAMS = new URLSearchParams({ breed_ids: breedId });
  const url = `${baseUrl}?${PARAMS}`;

  return axios.get(url).then(response => response.data);
}
