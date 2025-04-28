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

interface AppointmentListProps {
    onDelete: (id: number) => void;
    onEdit: (appointment: IAppointment) => void;
    appointmentProp: IAppointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ onDelete, onEdit, appointmentProp }) => {
    const [appointments, setAppointments] = useState<IAppointment[]>(appointmentProp);
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
        <div className="w-full max-h-[500px] overflow-y-auto p-4 border-2 border-black rounded-lg bg-white shadow-sm">
            <div className="flex gap-4 mb-4">
                <FormControl className="w-full">
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        label="Sort by"
                    >
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
