import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveMapPosition from "./SaveMapPosition";
import mapConfig from "../utils/mapConfig";

export default function MapView() {
  return (
    <MapContainer
      className="w-full h-full"
      {...mapConfig}
    >
      <SaveMapPosition />
    </MapContainer>
  );
}
