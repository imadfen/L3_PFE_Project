import { useEffect, useState } from "react";
import FireTable from "./FireTable";
import socket from "../utils/socket";
import checkLogin from "../utils/checkLogin";
import { Fire } from "../types/Fire";

type PropsType = {
    isOpen: boolean;
    exit: () => any
}

export default function HistoryModal({ isOpen, exit }: PropsType) {
    const [fires, setFires] = useState<Fire[]>([]);

    useEffect(() => {
        if (isOpen) {
            getHistory();
        }
    }, [isOpen]);

    const getHistory = async () => {
        const result = await checkLogin();
        if (result) {
            socket.emit("get-history");
            socket.on("full-history", (data: Fire[]) => {
                setFires(data);
            })
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-screen h-screen bg-white rounded-lg p-4 shadow-lg max-w-[90%]">
                <button
                    onClick={exit}
                    className="absolute top-1 right-1 bg-gray-200 text-black font-bold px-3 py-2 rounded-full focus:outline-none"
                >
                    ✖
                </button>

                <div>
                    <h2 className="text-5xl font-extrabold">Fire History</h2>
                    <FireTable fires={fires} />
                </div>
            </div>
        </div>
    )
}
