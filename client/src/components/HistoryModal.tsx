import FireTable from "./FireTable";

type PropsType = {
    isOpen: boolean;
    exit: () => any
}

export default function HistoryModal({ isOpen, exit }: PropsType) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-screen h-screen bg-white rounded-lg p-4 shadow-lg max-w-3xl">
                <button
                    onClick={exit}
                    className="absolute top-1 right-1 bg-gray-200 text-black font-bold px-3 py-2 rounded-full focus:outline-none"
                >
                    ✖
                </button>

                <div>
                    <h2 className="text-5xl font-extrabold">Fire History</h2>
                    <FireTable fires={[]} />
                </div>
            </div>
        </div>
    )
}
