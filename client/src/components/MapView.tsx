import { MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveMapPosition from "./SaveMapPosition";
import mapConfig from "../utils/mapConfig";
import { MapProvider, useMapContext } from "./MapContext";
import FireMarkers from "./FireMarkers";
import { Fire } from "../types/Fire";

type propsType = {
  fireList: Fire[];
  selectedFire: Fire | null;
  setSelectedFire: (fire: Fire | null) => any;
};

export default function MapView({ fireList, selectedFire, setSelectedFire }: propsType) {
  return (
    <MapProvider>
      <MapContainer className="w-full h-full" {...mapConfig}>
        <SaveMapPosition />
        <MapEvents />
        <FireMarkers fireList={fireList} selectedFire={selectedFire} setSelectedFire={setSelectedFire} />
      </MapContainer>
    </MapProvider>
  );
}

function MapEvents() {
  const { setZoom } = useMapContext();

  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });

  return null;
}
