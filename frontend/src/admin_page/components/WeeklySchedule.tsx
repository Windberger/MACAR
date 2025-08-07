import React from "react";
import {IAppointment} from "../interfaces/IAppointment";

interface WeeklyScheduleProps {
    appointments: IAppointment[];
    setAppointments: (appointments: IAppointment[]) => void;
    onAppointmentClick: (appointment: IAppointment | null, dateTime: Date) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({appointments, onAppointmentClick}) => {
    const hours = Array.from({length: 10}, (_, i) => i + 8);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date();

    const getAppointmentForCell = (day: string, hour: number) => {
        return appointments.find(appointment => {
            const appointmentDay = appointment.datetime.toLocaleDateString("en-US", {weekday: "long"});
            const appointmentHour = appointment.datetime.getHours();
            return appointmentDay === day && appointmentHour === hour;
        }) || null;
    };

    const getDateForDay = (dayIndex: number) => {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + dayIndex + 1); // Adjust to get the correct day
        return date;
    };

    return (
        <div className="flex justify-center h-full">
            <div className="overflow-x-auto w-full">
                <table
                    className="w-full h-full table-fixed border-t-2 border-l-2 border-r-2 border-b-2 border-black dark:border-gray-400">
                    <thead>
                    <tr className="bg-black text-white dark:bg-gray-400 dark:text-black">
                        <th className="px-2 py-2 text-center w-[8%]">Time</th>
                        {days.map((day, index) => {
                            const date = getDateForDay(index);
                            return (
                                <th key={day} className="px-2 py-2 text-center w-[8%]">
                                    <div>{day}</div>
                                    <div className="text-sm">{date.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit"
                                    })}</div>
                                </th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {hours.map(hour => (
                        <tr key={hour} className="border border-gray-300 dark:bg-gray-700 rounded-lg">
                            <td className="px-4 py-2 text-center">{hour}:00</td>
                            {days.map((day, index) => {
                                const date = getDateForDay(index);
                                const appointment = getAppointmentForCell(day, hour);
                                const dateTime = new Date(date);
                                dateTime.setHours(hour, 0, 0, 0);

                                return (
                                    <td
                                        key={day + hour}
                                        className="border border-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2 text-center break-words"
                                        onClick={() => onAppointmentClick(appointment, dateTime)}
                                    >
                                        {appointment ? appointment.type : " "}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeeklySchedule;