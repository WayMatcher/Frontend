/**
 * Represents a schedule object.
 * This interface is used to define the structure of a schedule entity.
 */
export default interface Schedule {
    /**
     * The unique identifier for the schedule.
     * Optional because it may not be set for new schedules.
     */
    scheduleId?: number;

    /**
     * The unique identifier of the user associated with the schedule.
     * This field is required.
     */
    userId: number;

    /**
     * The cron expression defining the schedule.
     * This field is required and must follow the cron syntax.
     */
    cronSchedule: string;
}
