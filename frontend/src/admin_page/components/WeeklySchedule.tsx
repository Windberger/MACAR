// admin_frontend/src/components/WeeklySchedule.tsx
import React, { useState } from "react";
import AppointmentDialog from "./AppointmentDialog";
import { mockAppointments } from "../assets/mockAppointments";
import {IAppointment} from "../interfaces/IAppointment.ts";

const WeeklySchedule: React.FC = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>(mockAppointments);
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const hours = Array.from({ length: 10 }, (_, i) => i + 8);
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const getAppointmentForCell = (day: string, hour: number) => {
        return appointments.find(appointment => {
            const appointmentDay = appointment.datetime.toLocaleDateString("de-DE", { weekday: "long" });
            const appointmentHour = appointment.datetime.getHours();
            return appointmentDay === day && appointmentHour === hour;
        }) || null;
    };

    const handleUpdate = (updatedAppointment: IAppointment) => {
        setAppointments(appointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    };

    const handleOpenDialog = (appointment: IAppointment | null) => {
        setSelectedAppointment(appointment);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedAppointment(null);
    };

    const handleSubmit = (appointment: IAppointment) => {
        if (selectedAppointment) {
            handleUpdate(appointment);
        } else {
            setAppointments([...appointments, appointment]);
        }
        handleCloseDialog();
    };

    return (
        <div className="flex justify-center h-full">
            <div className="overflow-x-auto w-full">
                <table className="w-full h-full table-fixed border-t-2 border-l-2 border-r-2 border-b-2 border-black">
                    <thead>
                    <tr className="bg-black text-white">
                        <th className="px-2 py-2 text-center w-[8%]">Zeit</th>
                        {days.map(day => (
                            <th key={day} className=" px-2 py-2 text-center w-[8%]">{day}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {hours.map(hour => (
                        <tr key={hour} className="border border-gray-300 rounded-lg">
                            <td className="px-4 py-2 text-center">{hour}:00</td>
                            {days.map(day => {
                                const appointment = getAppointmentForCell(day, hour);
                                return (
                                    <td
                                        key={day + hour}
                                        className="border border-gray-300 rounded-lg px-4 py-2 text-center break-words"
                                        onClick={() => handleOpenDialog(appointment)}
                                    >
                                        {appointment ? appointment.description : " "}
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