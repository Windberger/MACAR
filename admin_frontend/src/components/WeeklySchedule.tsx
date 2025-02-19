import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
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
                                    >
                                        {appointment ? appointment.description : " "}
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
                            <TextField
                                label="Name"
                                value={selectedAppointment.type}
                                onChange={(e) => setSelectedAppointment({...selectedAppointment, type: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Beschreibung"
                                value={selectedAppointment.description}
                                onChange={(e) => setSelectedAppointment({...selectedAppointment, description: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={() => handleDelete(selectedAppointment.id)}>Löschen</Button>
                            <Button onClick={() => setSelectedAppointment(null)}>Schließen</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default WeeklySchedule;
