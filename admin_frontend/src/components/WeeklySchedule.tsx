import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";

export interface Appointment {
    id: number;
    datetime: Date;
    datetimeString: string;
    type: string;
    description: string;
}

const mockAppointments: Appointment[] = [
    {
        id: 1,
        datetime: new Date("2025-02-14T10:00:00"),
        datetimeString: "2025-02-14T10:00:00",
        type: "Meeting",
        description: "Projektbesprechung mit Team",
    },
    {
        id: 2,
        datetime: new Date("2025-02-15T14:00:00"),
        datetimeString: "2025-02-15T14:00:00",
        type: "Arzttermin",
        description: "Routineuntersuchung beim Arzt",
    },
    {
        id: 3,
        datetime: new Date("2025-02-16T09:00:00"),
        datetimeString: "2025-02-16T09:00:00",
        type: "Sport",
        description: "Fitnessstudio Session",
    },
];

const WeeklySchedule: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const hours = Array.from({ length: 10 }, (_, i) => i + 8);
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const getAppointmentForCell = (day: string, hour: number) => {
        return appointments.find(appointment => {
            const appointmentDay = appointment.datetime.toLocaleDateString("de-DE", { weekday: "long" });
            const appointmentHour = appointment.datetime.getHours();
            return appointmentDay === day && appointmentHour === hour;
        }) || null;
    };

    const handleDelete = (id: number) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
        setSelectedAppointment(null);
    };

    return (
        <div className="overflow-auto p-4">
            <table className="w-full border-collapse rounded-lg">
                <thead>
                <tr className="border border-gray-300">
                    <th className="border border-gray-300 px-4 py-2 text-center">Zeit</th>
                    {days.map(day => (
                        <th key={day} className="border border-gray-300 px-4 py-2 text-center">{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map(hour => (
                    <tr key={hour} className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2 text-center">{hour}:00</td>
                        {days.map(day => {
                            const appointment = getAppointmentForCell(day, hour);
                            return (
                                <td
                                    key={day + hour}
                                    className={`border border-gray-300 px-4 py-2 text-center rounded-md relative ${appointment ? "bg-blue-400 text-white font-bold cursor-pointer" : ""}`}
                                    onClick={() => appointment && setSelectedAppointment(appointment)}
                                >
                                    {appointment ? appointment.description : ""}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedAppointment && (
                <Dialog open={true} onClose={() => setSelectedAppointment(null)}>
                    <DialogTitle>Termin bearbeiten</DialogTitle>
                    <DialogContent>
                        <p><strong>Typ:</strong> {selectedAppointment.type}</p>
                        <p><strong>Beschreibung:</strong> {selectedAppointment.description}</p>
                        <p><strong>Datum:</strong> {selectedAppointment.datetimeString}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={() => handleDelete(selectedAppointment.id)}>Löschen</Button>
                        <Button onClick={() => setSelectedAppointment(null)}>Schließen</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default WeeklySchedule;
