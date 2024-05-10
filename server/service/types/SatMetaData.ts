export type SatMetaData = {
    file_name: string;
    image_location: string;
    fetch_date: string;
    area_coords: {
      top_left: { latitude: number; longitude: number };
      top_right: { latitude: number; longitude: number };
      bottom_right: { latitude: number; longitude: number };
      bottom_left: { latitude: number; longitude: number };
    };
  }