import axios, { AxiosRequestConfig } from "axios";

const BASE_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5001/graphql";

interface BaseApiParams {
  data: any;
  token?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const baseApi = ({ data, token, onSuccess, onError }: BaseApiParams) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: BASE_API_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      "apollo-require-preflight": "true",
      Authorization: token ?? "",
    },
    data,
  };

  axios(config)
    .then((response: any) => {
      if (onSuccess) {
        onSuccess(response);
      }
    })
    .catch((error: any) => {
      if (onError) {
        onError(error);
      }
    });
};

export default baseApi;
