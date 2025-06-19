import axios from "axios";
import redisclient from "./redisclient.js";

const { WEATHER_API_KEY, WEATHER_API_BASE_URL, CACHE_EXPIRY } = process.env;

export const fetchweather = async (city) => {
  const url = `${WEATHER_API_BASE_URL}/weather?location=${city}&key=${WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getweatherdata = async (city) => {
  return new Promise((resolve, reject) => {
    redisclient.get(city, async (err, cachedData) => {
      if (err) return reject(err);
      if (cachedData) {
        resolve({ source: "cache", data: JSON.parse(cachedData) });
      } else {
        try {
          const weatherdata = await fetchweather(city);

          redisclient.set(
            city,
            JSON.stringify(weatherdata),
            "EX",
            CACHE_EXPIRY
          );

          resolve({ source: "API", data: weatherdata });
        } catch (apierror) {
          reject(apierror);
        }
      }
    });
  });
};
