import { createContext, useState, useContext, PropsWithChildren } from "react";

type mapContextPropsType = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const MapContext = createContext<mapContextPropsType>({
  zoom: 13,
  setZoom: () => {},
});

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }: PropsWithChildren) => {
  const [zoom, setZoom] = useState(13);

  return (
    <MapContext.Provider value={{ zoom, setZoom }}>
      {children}
    </MapContext.Provider>
  );
};
