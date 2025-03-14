import L from "leaflet";
import { MapContainerProps } from "react-leaflet";

const GoogleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

// const limitBoundCorner1 = L.latLng(37.22, -2.38);
// const limitBoundCorner2 = L.latLng(34.08, 8.82);
// const limitBounds = L.latLngBounds(limitBoundCorner1, limitBoundCorner2);

const mapConfig: MapContainerProps = {
    center: {
        lat: 36.38,
        lng: 2.87
    },
    maxZoom: 14,
    minZoom: 5,
    zoom: 9,
    layers: [GoogleSat],
    zoomControl: false,
}

export default mapConfig;