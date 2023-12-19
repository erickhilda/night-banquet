/**
 * @description Get geolocation of the user
 * @returns {Promise<{latitude: number, longitude: number}>} Promise object represents the geolocation of the user
 */

export default function getGeolocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
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
