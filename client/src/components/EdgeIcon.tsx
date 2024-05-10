import L, { LatLng } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import calculateEdgePoint from "../utils/calculateEdgePoint";
import fire_marker from "../assets/marker_edge_icon.png";
import { useEffect, useRef } from "react";

type propsType = {
  markerPosition: LatLng;
};

export default function EdgeIcon({ markerPosition }: propsType) {
  const map = useMap();
  const edgeIconRef = useRef<L.Marker | null>(null);

  const markerIcon = new L.Icon({
    iconUrl: fire_marker,
    iconSize: [60, 60],
  });

  const handleClick = () => {
    map.flyTo(markerPosition, 13);
  };

  useEffect(() => {
    edgeIconRef.current = L.marker(markerPosition, { icon: markerIcon });
    edgeIconRef.current.addEventListener("click", handleClick);
  }, [markerPosition]);

  useMapEvents({
    move: () => {
      if (edgeIconRef.current) {
        calculateEdgePoint(map, markerPosition, edgeIconRef.current);
      }
    },
    zoomend: () => {
      if (edgeIconRef.current) {
        calculateEdgePoint(map, markerPosition, edgeIconRef.current);
      }
    },
  });

  return null;
}
