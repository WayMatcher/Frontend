import { format } from 'date-fns'; // You might need to install date-fns: npm install date-fns

/**
 * Enum for the different repeating schedule options.
 */
export enum RepeatSchedule {
    Daily = 'Daily',
    Monthly = 'Monthly',
    Weekdays = 'Weekdays',
    Weekly = 'Weekly',
    Yearly = 'Yearly',
    None = 'None',
}

/**
 * Generates a Cron expression based on the event's start date and desired repeating schedule.
 *
 * @param startDate - The initial start date and time of the event.
 * @param scheduleType - The desired repeating schedule type from the RepeatSchedule enum.
 * @returns A Cron expression string representing the schedule.
 * @throws Error if an invalid schedule type is provided.
 */
export const generateCronExpression = (startDate: Date, scheduleType: RepeatSchedule): string => {
    const minute = format(startDate, 'm'); // Get minute (0-59)
    const hour = format(startDate, 'H'); // Get hour (0-23)
    const dayOfMonth = format(startDate, 'd'); // Get day of the month (1-31)
    const month = format(startDate, 'M'); // Get month (1-12)
    const dayOfWeek = format(startDate, 'i'); // Get day of the week (1 = Monday, 7 = Sunday)

    switch (scheduleType) {
        case RepeatSchedule.None:
            return '';

        case RepeatSchedule.Daily: // Added case for Daily
            // Runs every day at the same time as the start date.
            return `${minute} ${hour} * * *`; // Min Hour * * *

        case RepeatSchedule.Weekly:
            const cronDayOfWeekWeekly = dayOfWeek === '7' ? '0' : dayOfWeek;
            return `${minute} ${hour} * * ${cronDayOfWeekWeekly}`;

        case RepeatSchedule.Monthly:
            return `${minute} ${hour} ${dayOfMonth} * *`;

        case RepeatSchedule.Yearly:
            return `${minute} ${hour} ${dayOfMonth} ${month} *`;

        case RepeatSchedule.Weekdays:
            return `${minute} ${hour} * * 1-5`;

        default:
            console.error(`Invalid schedule type provided: ${scheduleType}`);
            throw new Error(`Invalid schedule type: ${scheduleType}`);
    }
};
