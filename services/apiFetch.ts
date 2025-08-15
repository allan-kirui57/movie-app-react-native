// api/apiFetch.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8000/api/v1";

/**
 * apiFetch - wrapper for fetch API
 * Automatically:
 * - Adds Authorization header if access token exists
 * - Refreshes token if expired (using refresh token)
 */
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    // Get tokens from storage
    let accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    // Add Authorization header
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    };
    console.log(`${API_BASE_URL}${endpoint}`)

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If token expired, try refreshing
    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch(`${API_BASE_URL}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        accessToken = refreshData.access_token;

        // Save new access token
        await AsyncStorage.setItem("access_token", accessToken);

        // Retry original request with new token
        const retryHeaders: HeadersInit = {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        };
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: retryHeaders,
        });
      } else {
        throw new Error("Session expired. Please log in again.");
      }
    }

    // const responseData = await response.json();
    // console.log("Response data:", responseData);
    // console.log("Response status:", response.status);
    // console.log("Response" + JSON.stringify(response));

    // Parse JSON
    // const data = await response.json();
    // if (!response.ok) {
    //   throw new Error(data.message || "API error");
    // }

    return response.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
};
