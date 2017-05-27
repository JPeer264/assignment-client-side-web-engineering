import apisauce from 'apisauce';

const api = (baseURL = 'http://ergast.com/api/f1/') => {
  const standardApi = apisauce.create({
    baseURL,
    headers: {
    },
  });

  const getConstructors = () => standardApi.get('/constructors.json');
  const getDriversByConstructorId = constructorId => standardApi.get(`/constructors/${constructorId}/drivers.json`);

  return {
    getConstructors,
    getDriversByConstructorId,
  };
};

export default api;
