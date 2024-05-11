import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function SaveMapPosition() {
  const map = useMap();

  useEffect(() => {
    const saveMapState = () => {
      const mapState = {
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
        zoom: map.getZoom(),
      };
      localStorage.setItem("mapState", JSON.stringify(mapState));
    };

    map.on("moveend", saveMapState);

    const mapState = localStorage.getItem("mapState");
    const savedMapState = mapState
      ? JSON.parse(mapState)
      : {
        lat: 36.38,
        lng: 2.87,
        zoom: 9,
      };

    if (savedMapState) {
      map.setView([savedMapState.lat, savedMapState.lng], savedMapState.zoom);
    }

    return () => {
      map.off("moveend", saveMapState);
    };
  }, [map]);

  return null;
}
