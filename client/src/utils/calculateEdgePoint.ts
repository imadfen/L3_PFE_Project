import L, { LatLng, Map } from "leaflet";

export default function calculateEdgePoint(map: Map, markerPosition: LatLng, edgeIconRef: L.Marker) {
    const bounds = map.getBounds();

    if (bounds.contains(markerPosition)) {
        edgeIconRef.remove();
    } else {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const closestLat = (markerPosition.lat > ne.lat) ? ne.lat : (markerPosition.lat < sw.lat) ? sw.lat : markerPosition.lat;
        const closestLng = (markerPosition.lng > ne.lng) ? ne.lng : (markerPosition.lng < sw.lng) ? sw.lng : markerPosition.lng;

        const edgeLat = (markerPosition.lat > ne.lat || markerPosition.lat < sw.lat) ? closestLat : markerPosition.lat;
        const edgeLng = (markerPosition.lng > ne.lng || markerPosition.lng < sw.lng) ? closestLng : markerPosition.lng;

        edgeIconRef.setLatLng(L.latLng(edgeLat, edgeLng));

        if (!map.hasLayer(edgeIconRef)) {
            edgeIconRef.addTo(map);
        }
    }
}