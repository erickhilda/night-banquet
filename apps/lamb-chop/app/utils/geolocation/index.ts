/**
 * @description Get geolocation of the user
 * @returns {Promise<{latitude: number, longitude: number}>} Promise object represents the geolocation of the user
 */

export default function getGeolocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== "production") {
      return resolve({
        latitude: -7.29316,
        longitude: 112.7837223,
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(
            new Error(
              "Error occurred while getting geolocation: " + error.message
            )
          );
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
