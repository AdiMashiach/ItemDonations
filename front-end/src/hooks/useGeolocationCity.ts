import { useState, useEffect } from "react";

const useGeolocationCity = (apiKey: string) => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async (lat: number, lon: number) => {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=he`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const components = data.results[0].components;
        const cityName =
          components.city ||
          components.town ||
          components.village ||
          components.state ||
          components.country;
        setCity(cityName || "לא נמצאה עיר");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchCity(lat, lon);
      });
    }
  }, [apiKey]);

  return { city };
};

export default useGeolocationCity;
