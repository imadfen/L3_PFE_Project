import { Fire } from "../types/Fire"
import fireMarker from "../assets/fire_marker.svg"
import logoutIcon from "../assets/logout_icon.svg"
import historyIcon from "../assets/history_icon.svg"


type PropsType = {
    fireList: Fire[];
    selectedFire: Fire | null;
    setSelectedFire: (fireId: Fire | null) => any;
    lastFetch?: string;
    openLoginForm: () => any;
    isLoggedIn: boolean;
    logout: () => any;
    openHistory: () => any;
    openImageModal: (url: string) => any;
}

export default function SideBar({ fireList, selectedFire, setSelectedFire, openLoginForm, openImageModal, isLoggedIn, logout, openHistory, lastFetch }: PropsType) {
    const handleLogout = () => {
        const confirmation = window.confirm("Are you sure you want to log out?");
        if (confirmation) {
            logout();
        }
    };

    return (
        <div className="w-1/3 flex flex-col bg-gray-800 text-white p-4">
            <div className="flex justify-end h-10">
                {isLoggedIn ?
                    <div className="flex gap-2">
                        <button className="bg-blue-700 px-3 py-2 rounded-full font-extrabold hover:bg-blue-600 active:bg-blue-700 duration-200"
                            onClick={openHistory}>
                            <img src={historyIcon} alt="history" width={20} />
                        </button>
                        <button className="bg-blue-700 px-3 py-2 rounded-full font-extrabold hover:bg-blue-600 active:bg-blue-700 duration-200"
                            onClick={handleLogout}>
                            <img src={logoutIcon} alt="logout" width={20} />
                        </button>
                    </div>
                    :
                    <button className="bg-blue-700 px-3 py-2 rounded-full font-extrabold hover:bg-blue-600 active:bg-blue-700 duration-200"
                        onClick={openLoginForm}>
                        Login
                    </button>
                }
            </div>

            {
                selectedFire ? (
                    <div className="p-5 overflow-y-auto flex-grow flex flex-col">
                        <button className="font-extrabold text-lg bg-blue-700 w-2/12 aspect-square rounded-full mb-2 ml-auto hover:bg-blue-600 active:bg-blue-700 duration-200"
                            onClick={() => setSelectedFire(null)}>✖</button>
                        <img src={`api/image/${selectedFire.imageFileName}`} className="cursor-pointer" onClick={() => openImageModal(`api/image/${selectedFire.imageFileName}`)} />
                        <div className="flex flex-col justify-evenly flex-grow">
                            <div>
                                <p className="text-lg font-bold">Fire Confidence:</p>
                                <p>{selectedFire.fire_score.toFixed(5)}</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">Datetime:</p>
                                <p>{selectedFire.datetime}</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">Top-Left Coords:</p>
                                <ul className="list-disc list-inside">
                                    <li>{selectedFire.tl_latitude}</li>
                                    <li>{selectedFire.tl_longitude}</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-lg font-bold">Bottom-Right Coords:</p>
                                <ul className="list-disc list-inside">
                                    <li>{selectedFire.br_latitude}</li>
                                    <li>{selectedFire.br_longitude}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 overflow-y-auto flex-grow flex flex-col gap-2">
                        {fireList.length > 0 ? fireList.map((fire, i) => (
                            <div className="flex gap-3 bg-slate-700 p-4 rounded-full cursor-pointer hover:scale-105 active:bg-slate-600 duration-150"
                                key={i}
                                onClick={() => setSelectedFire(fire)}>
                                <img src={fireMarker} className="w-2/12" />
                                <div>
                                    <p className="font-bold">{fire.tl_latitude.toFixed(4)}, {fire.tl_longitude.toFixed(4)}</p>
                                    <p className="text-4xl font-extrabold">{(fire.fire_score * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        ))
                            : (
                                <p className="text-center text-3xl font-bold text-green-400">No Wildfire</p>
                            )}
                    </div>
                )
            }


            {lastFetch && <p className="text-right"><b>Last check:</b> {lastFetch}</p>}
        </div >
    )
}
