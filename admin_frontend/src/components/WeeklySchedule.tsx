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
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-auto p-4 w-4/5 h-4/5">
                <table className="w-full border-collapse border border-gray-300 table-fixed">
                    <thead>
                    <tr className="border border-gray-300">
                        <th className="border border-gray-300 px-4 py-2 text-center w-[12.5%]">Zeit</th>
                        {days.map(day => (
                            <th key={day} className="border border-gray-300 px-4 py-2 text-center w-[12.5%]">{day}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {hours.map(hour => (
                        <tr key={hour} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2 text-center w-[12.5%]">{hour}:00</td>
                            {days.map(day => {
                                const appointment = getAppointmentForCell(day, hour);
                                return (
                                    <td
                                        key={day + hour}
                                        className="border border-gray-300 px-4 py-2 text-center w-[12.5%] break-words"
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

                {isDialogOpen && (
                    <AppointmentDialog
                        open={isDialogOpen}
                        onClose={handleCloseDialog}
                        onSubmit={handleSubmit}
                        appointment={selectedAppointment}
                    />
                )}
            </div>
        </div>
    );
};

export default WeeklySchedule;