class DateService {
    dateToEpoch(dateString: string): number {
        // Split the date string into day, month, and year
        const [day, month, year] = dateString.split('/').map(Number);

        // Create a Date object using the parsed values (months are 0-based in JavaScript Date)
        const date = new Date(year, month - 1, day);

        // Return the epoch timestamp
        return date.getTime();
    }
}

export default new DateService();
