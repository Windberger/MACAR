import React, { useState } from "react";
import {
    MenuItem,
    TextField,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import { IAppointment } from "../interfaces/IAppointment";
import { AppointmentCard } from "./AppointmentCard";
import AppointmentDialog from "./AppointmentDialog";

const mockAppointments: IAppointment[] = [
    {
        id: 1,
        title: "Consultation",
        type: "Consultation",
        datetimeString: "2023-12-01T10:00:00",
        datetime: new Date("2023-12-01T10:00:00"),
        description: "Consultation with Dr. Smith"
    },
    {
        id: 2,
        title: "Checkup",
        type: "Checkup",
        datetimeString: "2023-12-02T11:00:00",
        datetime: new Date("2023-12-02T11:00:00"),
        description: "Annual checkup"
    },
    {
        id: 3,
        title: "Follow-up",
        type: "Follow-up",
        datetimeString: "2023-12-03T12:00:00",
        datetime: new Date("2023-12-03T12:00:00"),
        description: "Follow-up appointment"
    }
];

interface AppointmentListProps {
    onDelete: (id: number) => void;
    onEdit: (appointment: IAppointment) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ onDelete, onEdit }) => {
    const [appointments, setAppointments] = useState<IAppointment[]>(mockAppointments);
    const [sortBy, setSortBy] = useState("date");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            onEdit(appointment);
        } else {
            setAppointments([...appointments, appointment]);
        }
        handleCloseDialog();
    };

    const sortedAppointments = [...appointments].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(a.datetimeString).getTime() - new Date(b.datetimeString).getTime();
        }
        return a.title.localeCompare(b.title);
    });

    const filteredAppointments = sortedAppointments.filter(
        (appointment) =>
            appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.datetimeString.includes(searchTerm)
    );

    return (
        <div style={{ width: "100%", maxHeight: "500px", overflowY: "auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel>Sort by</InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredAppointments.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={handleOpenDialog}
                />
            ))}
            {isDialogOpen && (
                <AppointmentDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                    appointment={selectedAppointment}
                />
            )}
        </div>
    );
};

export default AppointmentList;