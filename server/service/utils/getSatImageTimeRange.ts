import { TimeRange } from "../types/TimeRange";

export default function getSatImageTimeRange(): TimeRange {
    const today: Date = new Date();
    today.setUTCHours(23, 59, 59, 0);

    const pastDate: Date = new Date(today);
    pastDate.setDate(pastDate.getDate() - 28);
    pastDate.setUTCHours(0, 0, 0, 0);

    const startDate: string = pastDate.toISOString();
    const endDate: string = today.toISOString();

    return { from: startDate, to: endDate };
}