import { useEffect, useState } from "react";
import FireTable from "./FireTable";
import socket from "../utils/socket";
import { Fire } from "../types/Fire";

type PropsType = {
    isOpen: boolean;
    exit: () => any
}

export default function HistoryModal({ isOpen, exit }: PropsType) {
    const [fires, setFires] = useState<Fire[]>([]);
    const [unauthorized, setUnauthorized] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            getHistory();

            socket.on("full-history", () => {
                getHistory();
            })
        }
        return () => {
            socket.off("full-history");
        }
    }, [isOpen]);

    const getHistory = async () => {
        const response = await fetch("/api/getfires", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (response.status === 200) {
            const fires: Fire[] = await response.json();
            setUnauthorized(false);
            setFires(fires);
        } else if (response.status === 403) {
            setUnauthorized(true);
        } else {
            setError(true);
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
                    {error ?
                        <p className="text-3xl text-red-500 text-center">
                            Something went wrong
                        </p>
                        : unauthorized ?
                            <p className="text-3xl text-red-500 text-center">
                                You are not authorized
                            </p>
                            :
                            <FireTable fires={fires} />
                    }
                </div>
            </div>
        </div>
    )
}
