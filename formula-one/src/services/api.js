import apisauce from 'apisauce';

const api = (baseURL = 'http://ergast.com/api/f1/') => {
  const standardApi = apisauce.create({
    baseURL,
    headers: {
    },
  });

  // Step 1. define the standardApi
  const getConstructors = () => standardApi.get('/constructors.json');

  // Step 2. return the defined standardApi
  return {
    getConstructors,
  };
};

export default api;
