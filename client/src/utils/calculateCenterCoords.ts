
type Coords = {
    tl_longitude: number;
    tl_latitude: number;
    br_longitude: number;
    br_latitude: number;
    [key: string]: any;
}

export default function calculateCenterCoords(coords: Coords) {
    const {tl_latitude, tl_longitude, br_latitude, br_longitude} = coords;
    
    return {
        lat: Math.abs(br_latitude - tl_latitude) / 2 + Math.min(br_latitude, tl_latitude),
        lng: Math.abs(br_longitude - tl_longitude) / 2 + Math.min(br_longitude, tl_longitude),
    }
}