import { useState } from "react";
import MapView from "./components/MapView";

function App() {
  const [fireDetect, setFireDetect] = useState([
    [36.58, 2.84],
    [36.29, 5.91],
    [35.81, 1.38],
    [34.6, -1.66],
  ]);

  return (
    <div className="h-screen w-screen bg-red-400">
      <MapView fireList={fireDetect} />
    </div>
  );
}

export default App;
