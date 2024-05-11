import L from "leaflet";
import FireMapMarker from "./FireMapMarker";
import { Fire } from "../types/Fire";

type propsType = {
  fireList: Fire[];
  selectedFire: Fire | null;
  setSelectedFire: (fire: Fire | null) => any;
};

export default function FireMarkers({ fireList, selectedFire, setSelectedFire }: propsType) {
  return (
    <>
      {fireList.map((fire, i) => {
        const { tl_latitude, tl_longitude, br_latitude, br_longitude } = fire;

        return (
          <FireMapMarker
            key={i}
            center={L.latLng({
              lat: Math.abs(br_latitude - tl_latitude) / 2 + Math.min(br_latitude, tl_latitude),
              lng: Math.abs(br_longitude - tl_longitude) / 2 + Math.min(br_longitude, tl_longitude),
            })}
            markerFire={fire}
            selectedFire={selectedFire}
            setSelectedFire={() => setSelectedFire(fire)}
          />
        )
      }
      )}
    </>
  );
}
