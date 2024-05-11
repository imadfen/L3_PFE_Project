import { useState } from "react";
import MapView from "./components/MapView";
import { Fire } from "./types/Fire";
import SideBar from "./components/SideBar";
import ImageModal from "./components/ImageModal";

function App() {
  const [selectedFire, setSelectedFire] = useState<Fire | null>(null);
  const [zoomedPictureUrl, setZoomedPictureUrl] = useState<string | null>(null);
  const [fireDetect, _] = useState<Fire[]>([
    {
      "id": 2,
      "datetime": "2024-05-11 14:07:54",
      "tl_longitude": 3.97774,
      "tl_latitude": 36.69953,
      "br_longitude": 4.40277,
      "br_latitude": 36.40553,
      "imageFileName": "20240511150754.png",
      "fire_score": 0.14985501766204834
    }
  ]);

  return (
    <>
      <ImageModal imageUrl={zoomedPictureUrl} exit={() => setZoomedPictureUrl(null)} />
      <div className="h-screen w-screen relative" id="page-container">

        <div className="h-screen w-screen z-10 flex">
          <MapView fireList={fireDetect} selectedFire={selectedFire} setSelectedFire={setSelectedFire} />
          <SideBar fireList={fireDetect} selectedFire={selectedFire} setSelectedFire={setSelectedFire} openImageModal={(url) => setZoomedPictureUrl(url)} lastFetch="09/05/2024 11:00:00" />
        </div>
      </div>
    </>
  );
}

export default App;
