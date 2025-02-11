import Cookies from "js-cookie";

const useTokens = () => {
  // Safely get and parse userData from cookies
  const userData = Cookies.get("userData");

  try {
    const parsedData = userData ? JSON.parse(userData) : null;
    // Safely access token and other properties
    return {
      token: parsedData?.token,
      createdAt: parsedData?.createdAt,
      email: parsedData?.email,
    };
  } catch (error) {
    console.error("Error parsing userData cookie:", error);
    return {
      token: undefined,
      createdAt: undefined,
    };
  }
};

export default useTokens;
