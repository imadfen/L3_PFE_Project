import L, { LatLng } from "leaflet";
import { Circle, Marker, useMap } from "react-leaflet";
import { useMapContext } from "./MapContext";
import fire_marker from "../assets/fire_marker.svg";
// import EdgeIcon from "./EdgeIcon";
import { Fire } from "../types/Fire";
import { useEffect } from "react";

type propsType = {
  center: LatLng;
  markerFire: Fire;
  selectedFire: Fire | null;
  setSelectedFire: () => any;
};

export default function FireMapMarker({ center, markerFire, selectedFire, setSelectedFire }: propsType) {
  const { zoom } = useMapContext();
  const map = useMap();
  const zoomLevelToShowMarker = 13;

  useEffect(() => {
    if (selectedFire && selectedFire.id === markerFire.id) {
      handleClick();
    }
  }, [selectedFire]);

  const markerIcon = new L.Icon({
    iconUrl: fire_marker,
    iconSize: [50, 50],
  });

  const handleClick = () => {
    map.flyTo(center, zoomLevelToShowMarker);
    setSelectedFire();
  };

  return (
    <>
      {zoom >= zoomLevelToShowMarker ? (
        <Circle
          center={center}
          pathOptions={{ fillColor: "red", color: "red" }}
          radius={1000}
          eventHandlers={{
            click: handleClick,
          }}
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

      {/* <EdgeIcon markerPosition={center} setSelectedFire={setSelectedFire} /> */}
    </>
  );
}
