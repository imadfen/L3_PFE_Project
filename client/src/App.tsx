import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import { Fire } from "./types/Fire";
import SideBar from "./components/SideBar";
import ImageModal from "./components/ImageModal";
import LoginFormModal from "./components/LoginFormModal";
import HistoryModal from "./components/HistoryModal";
import logout from "./utils/logout";
import checkLogin from "./utils/checkLogin";
import socket from "./utils/socket";

function App() {
  const [selectedFire, setSelectedFire] = useState<Fire | null>(null);
  const [zoomedPictureUrl, setZoomedPictureUrl] = useState<string | null>(null);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [lastScanDate, setLastScanDate] = useState<string | undefined>(undefined);
  const [fireDetect, setFireDetect] = useState<Fire[]>([
    // {
    //   "id": 2,
    //   "datetime": "2024-05-11 14:07:54",
    //   "tl_longitude": 3.97774,
    //   "tl_latitude": 36.69953,
    //   "br_longitude": 4.40277,
    //   "br_latitude": 36.40553,
    //   "imageFileName": "20240511150754.png",
    //   "fire_score": 0.14985501766204834
    // },
    // {
    //   "id": 3,
    //   "datetime": "2024-05-11 14:07:54",
    //   "tl_longitude": 4.07774,
    //   "tl_latitude": 36.59953,
    //   "br_longitude": 4.50277,
    //   "br_latitude": 36.30553,
    //   "imageFileName": "20240511150754.png",
    //   "fire_score": 0.14985501766204834
    // },
    // {
    //   "id": 4,
    //   "datetime": "2024-05-11 14:07:54",
    //   "tl_longitude": 3.87774,
    //   "tl_latitude": 36.79953,
    //   "br_longitude": 4.50277,
    //   "br_latitude": 36.50553,
    //   "imageFileName": "20240511150754.png",
    //   "fire_score": 0.14985501766204834
    // }
  ]);

  useEffect(() => {
    checkAuth();

    socket.on('today-fires', (data: Fire[]) => {
      setFireDetect(data);
    });
    
    socket.on('last-scan-date', (data: string) => {
      setLastScanDate(data);
    });

    socket.on("new-fire", (data: Fire) => {
      console.log(data);
      setFireDetect(prev => [...prev, data]);
    })

    return () => {
      socket.off('today-fires');
      socket.off('last-scan-date');
      socket.off('last-scan-date');
      socket.off('new-fire');
    };
  }, []);

  const checkAuth = async () => {
    const result = await checkLogin();
    setIsLoggedIn(result)
  }

  return (
    <>
      <HistoryModal isOpen={isHistoryOpen} exit={() => setIsHistoryOpen(false)} />
      <LoginFormModal setLoggedIn={() => setIsLoggedIn(true)} isOpen={isLoginForm} onClose={() => setIsLoginForm(false)} />
      <ImageModal imageUrl={zoomedPictureUrl} exit={() => setZoomedPictureUrl(null)} />
      <div className="h-screen w-screen relative" id="page-container">

        <div className="h-screen w-screen z-10 flex">
          <MapView fireList={fireDetect} selectedFire={selectedFire} setSelectedFire={setSelectedFire} />
          <SideBar fireList={fireDetect} selectedFire={selectedFire} setSelectedFire={setSelectedFire}
            openImageModal={(url) => setZoomedPictureUrl(url)}
            openLoginForm={() => setIsLoginForm(true)}
            isLoggedIn={isLoggedIn}
            logout={() => {
              logout();
              setIsLoggedIn(false)
            }}
            openHistory={() => setIsHistoryOpen(true)}
            lastFetch={lastScanDate} />
        </div>
      </div>
    </>
  );
}

export default App;
