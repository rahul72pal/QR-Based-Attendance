import axios, {  AxiosResponse } from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({});

// Define the type for the request method
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const apiConnector = async (
    method: HttpMethod,
    url: string,
    bodydata?: any, // Use a more specific type if known
    headers?: Record<string, string>, // Optional headers
    params?: Record<string, any> // Optional query parameters
): Promise<AxiosResponse<any>> => {
    console.log("API CONNECTOR = ",url,bodydata)
    return axiosInstance({
        method,
        url,
        data: bodydata,
        headers: {
            'Content-Type': 'application/json',
            ...headers, 
        },
        params
    });
};