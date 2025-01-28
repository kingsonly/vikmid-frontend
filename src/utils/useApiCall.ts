import useTokens from "../hooks/useTokens";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import useSWR from "swr";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";
import { NextRouter } from "next/router";

// Create an axios instance
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const apiClient = axios.create({
  baseURL: baseURL as string,
});

// API call for POST, PUT, DELETE, PATCH requests
interface ApiCallOptions {
  endpoint: string;
  method: "post" | "put" | "delete" | "patch" | "get";
  params?: any;
  data?: any;
  headers?: any;
  successMessage?: string;
  showToast?: boolean;
}

export const useApiCall = () => {
  const { token } = useTokens();
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { errorStates, updateErrorState, setToastShown } = useEndpointErrors();

  const apiCall = async (
    {
      endpoint,
      method,
      params = {},
      data = {},
      headers = {},
      successMessage = "Successful",
      showToast = true,
    }: ApiCallOptions,
    router?: any // Accept router as a parameter
  ): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const baseURL = `${url}`;

    const requestConfig: AxiosRequestConfig = {
      baseURL,
      url: endpoint,
      method,
      params,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await apiClient(requestConfig);
      if (response.status >= 200 && response.status < 300 && showToast) {
        toast.success(successMessage);
      }
      updateErrorState(endpoint, false, true);
      return response;
    } catch (error: any) {
      handleApiError(
        error,
        router, // Pass router here
        setIsNetworkError,
        endpoint,
        errorStates,
        updateErrorState,
        setToastShown
      );
      throw error;
    }
  };

  return {
    apiCall,
    isNetworkError,
  };
};


// SWR hook for GET requests with revalidation
export const useGetRequest = (
  endpoint: string,
  revalidate = true,
  refreshInterval?: number,
  router?: any // Accept router as a parameter
) => {
  const { token } = useTokens();
  const { errorStates, updateErrorState, setToastShown } = useEndpointErrors();
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false);

  const endpointState = errorStates.find(
    (entry) => entry.endpoint === endpoint
  );

  const fetcher = async (url: string): Promise<any> => {
    if (endpointState?.errorExists && endpointState.errorCount >= 5) {
      console.warn(`Blocked fetch for ${endpoint} due to repeated errors.`);
      throw new Error(`Blocked fetch for ${endpoint}`);
    }

    try {
      const response = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateErrorState(endpoint, false, true);
      setIsNetworkError(false);
      return response.data;
    } catch (error: any) {
      handleApiError(
        error,
        router, // Pass router here
        setIsNetworkError,
        endpoint,
        errorStates,
        updateErrorState,
        setToastShown
      );
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${apiClient.defaults.baseURL}${endpoint}`,
    fetcher,
    {
      revalidateOnFocus: revalidate,
      revalidateOnReconnect: revalidate,
      refreshInterval,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    errorStates: { errorStates, isNetworkError },
  };
};


export type ApiErrorStatesType = {
  errorStates: {
    endpoint: string;
    errorExists: boolean;
    errorCount: number;
    toastShown: boolean;
  }[];
  isNetworkError: boolean;
};

// Hook to manage error states for endpoints
const useEndpointErrors = () => {
  const [errorStates, setErrorStates] = useState<
    Array<{
      endpoint: string;
      errorExists: boolean;
      errorCount: number;
      toastShown: boolean;
    }>
  >([]);

  const updateErrorState = (
    endpoint: string,
    error: boolean,
    resetToast = false
  ) => {
    setErrorStates((prev) => {
      const existing = prev.find((entry) => entry.endpoint === endpoint);

      if (existing) {
        return prev.map((entry) =>
          entry.endpoint === endpoint
            ? {
              ...entry,
              errorExists: error,
              errorCount: error ? entry.errorCount + 1 : 0,
              toastShown: resetToast ? false : entry.toastShown,
            }
            : entry
        );
      } else if (error) {
        return [
          ...prev,
          { endpoint, errorExists: true, errorCount: 1, toastShown: false },
        ];
      }
      return prev; // No change if resetting non-existent entry
    });
  };

  const setToastShown = (endpoint: string) => {
    setErrorStates((prev) =>
      prev.map((entry) =>
        entry.endpoint === endpoint ? { ...entry, toastShown: true } : entry
      )
    );
  };

  return { errorStates, updateErrorState, setToastShown };
};

// Error handler to process different error cases
const handleApiError = (
  error: AxiosError | Error,
  router: NextRouter,
  setIsNetworkError: (value: boolean) => void,
  endpoint: string,
  errorStates: Array<{
    endpoint: string;
    errorExists: boolean;
    errorCount: number;
    toastShown: boolean;
  }>,
  updateErrorState: (
    endpoint: string,
    error: boolean,
    resetToast?: boolean
  ) => void,
  setToastShown: (endpoint: string) => void
) => {
  const setErrorState = (errorExists: boolean) => {
    updateErrorState(endpoint, errorExists);
  };

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          if (!router) {
            toast.error("Bad Request: Please check your submission.");
            setToastShown(endpoint);
          }
          if (!errorStates.find((e) => e.endpoint === endpoint)?.toastShown) {
            toast.error("Bad Request: Please check your submission.");
            setToastShown(endpoint);
          }
          setErrorState(true);
          break;
        case 401:
          if (!router) {
            toast.error("Unauthorized: Please log in again.");
            setToastShown(endpoint);
            Cookies.remove("userData");

          }
          if (router.pathname !== "/login") {
            if (!errorStates.find((e) => e.endpoint === endpoint)?.toastShown) {
              toast.error("Unauthorized: Please log in again.");
              setToastShown(endpoint);
            }
            Cookies.remove("userData");
            router.push("/login");
          }
          setErrorState(true);
          break;
        case 403:
          if (!router) {
            toast.error(
              "Forbidden: You don't have permission to perform this action."
            );
            setToastShown(endpoint);
            Cookies.remove("userData");


          }
          if (!errorStates.find((e) => e.endpoint === endpoint)?.toastShown) {
            toast.error(
              "Forbidden: You don't have permission to perform this action."
            );
            setToastShown(endpoint);
          }
          Cookies.remove("userData");
          router.push("/login");
          setErrorState(true);
          break;
        default:
          setErrorState(true);
          break;
      }
    } else if (error.request) {
      setIsNetworkError(true);
      setErrorState(true);
    } else {
      console.error(`Unexpected Error: ${error.message}`);
      setErrorState(true);
    }
  }
};

