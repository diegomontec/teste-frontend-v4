import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export const useMap = (containerId: string) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapboxToken) {
      console.error("Mapbox token não definido!");
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    const mapInstance = new mapboxgl.Map({
      container: containerId,
      style: "mapbox://styles/diegomontec/cm17zee0e009y01qkg4suaqpg",
      center: [-45.947756, -19.126536],
      zoom: 9,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl());
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [containerId, mapboxToken]);

  return map;
};
