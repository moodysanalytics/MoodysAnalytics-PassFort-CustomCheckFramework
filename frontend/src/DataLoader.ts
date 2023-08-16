import axios from 'axios';

export const dataLoader = async ({ params }: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(`token-${params.id}`)}`,
    },
  };

  let response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/retrieveCheckData`, 
    {
      id: params.id,
    },
    config,
  );

  return response.data;
};
