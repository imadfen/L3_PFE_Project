import L from "leaflet";
import FireMapMarker from "./FireMapMarker";

type propsType = {
  fireList: number[][];
};

export default function FireMarkers({ fireList }: propsType) {
  return (
    <>
      {fireList.map((fire, i) => (
        <FireMapMarker
          key={i}
          center={L.latLng({
            lat: fire[0],
            lng: fire[1],
          })}
        />
      ))}
    </>
  );
}
