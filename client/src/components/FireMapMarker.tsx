import L, { LatLng } from "leaflet";
import { Circle, Marker, useMap } from "react-leaflet";
import { useMapContext } from "./MapContext";
import fire_marker from "../assets/fire_marker.svg";
import EdgeIcon from "./EdgeIcon";

type propsType = {
  center: LatLng;
};

export default function FireMapMarker({ center }: propsType) {
  const { zoom } = useMapContext();
  const map = useMap();
  const zoomLevelToShowMarker = 13;

  const markerIcon = new L.Icon({
    iconUrl: fire_marker,
    iconSize: [50, 50],
  });

  const handleClick = () => {
    map.flyTo(center, zoomLevelToShowMarker);
  };

  return (
    <>
      {zoom >= zoomLevelToShowMarker ? (
        <Circle
          center={center}
          pathOptions={{ fillColor: "red", color: "red" }}
          radius={1000}
        />
      ) : (
        <Marker
          position={center}
          icon={markerIcon}
          eventHandlers={{
            click: handleClick,
          }}
        />
      )}
      <EdgeIcon markerPosition={center} />
    </>
  );
}
