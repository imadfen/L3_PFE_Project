import { Fire } from "../types/Fire";
import calculateCenterCoords from "../utils/calculateCenterCoords";

type PropsType = {
    fires: Fire[];
}

export default function FireTable({ fires }: PropsType) {
    return (
        <div className="mx-auto p-4 overflow-y-auto">
            <table className="min-w-full border border-gray-200 bg-white shadow-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Date & Time</th>
                        <th className="py-2 px-4 border-b border-gray-200">Longitude</th>
                        <th className="py-2 px-4 border-b border-gray-200">Latitude</th>
                        <th className="py-2 px-4 border-b border-gray-200">Fire Score</th>
                    </tr>
                </thead>
                <tbody>
                    {fires.map((fire) => {
                        const centerCoords = calculateCenterCoords(fire);
                        return (
                            <tr key={fire.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">{fire.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{fire.datetime}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{centerCoords.lng}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{centerCoords.lat}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{fire.fire_score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
