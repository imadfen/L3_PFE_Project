import { MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveMapPosition from "./SaveMapPosition";
import mapConfig from "../utils/mapConfig";
import { MapProvider, useMapContext } from "./MapContext";
import FireMarkers from "./FireMarkers";

type propsType = {
  fireList: number[][];
};

export default function MapView({ fireList }: propsType) {
  return (
    <MapProvider>
      <MapContainer className="w-full h-full" {...mapConfig}>
        <SaveMapPosition />
        <MapEvents />
        <FireMarkers fireList={fireList} />
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
