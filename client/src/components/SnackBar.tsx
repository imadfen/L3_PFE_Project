import { useEffect } from "react";
import warningIcon from "../assets/warning_icon.svg"

type PropsType = {
    isOpen: boolean;
    duration?: number;
    onClose: () => void;
}

export default function SnackBar({ isOpen, duration = 5000, onClose }: PropsType) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed z-30 top-4 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-orange-700 px-5 py-3 rounded shadow-lg flex justify-center items-center gap-3">
            <img src={warningIcon} width={30} />
            <h1 className="text-lg font-bold">
                There is a new fire has been detected!
            </h1>
            <button onClick={onClose}>✖</button>
        </div>
    );
};