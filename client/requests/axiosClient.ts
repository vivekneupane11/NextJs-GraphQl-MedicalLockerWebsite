import axios from 'axios';
import { GetCaregiversQuery, GetDepartmentsQuery, GetMeQuery, GetServiceQuery, GetServicesQuery } from '../generated/graphql';
const BASE_URL = 'http://localhost:3000/api/graphql';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosGetMe = async (data: string, access_token: string) => {
  const response = await authApi.post<GetMeQuery>(
    '',
    { query: data },
    {
      headers: {
        cookie: `access_token=${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const axiosGetCaregivers = async () => {
  const response = await authApi.post<GetCaregiversQuery>(
    '',
 
    {
      headers: {
        'Content-Type': 'application/json',
        
      },
    }
  );
  return response.data;
};
export const axiosGetServices = async () => {
  const response = await authApi.post<GetServicesQuery>(
    '',
 
    {
      headers: {
        'Content-Type': 'application/json',
        
      },
    }
  );
  return response.data;
};

export const axiosGetService = async (id:string | undefined) => {
  const response = await authApi.post<GetServiceQuery>(
    '',
 
    {
      headers: {
        'Content-Type': 'application/json',
        
      },
    }
  );
  return response.data;
};

export const axiosGetDepartments = async () => {
  const response = await authApi.post<GetDepartmentsQuery>(
    '',
 
    {
      headers: {
        'Content-Type': 'application/json',
        
      },
    }
  );
  return response.data;
};
