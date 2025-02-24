import React, {JSX, useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    MenuItem,
    TextField,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IAppointment } from "../interfaces/IAppointment";

interface AppointmentListProps {
    appointments: IAppointment[];
    onDelete: (id: number) => void;
    onEdit: (appointment: IAppointment) => void;
}

const iconMap: { [key: string]: JSX.Element } = {
    Consultation: <MedicalServicesIcon color="primary" />,
    Checkup: <EventIcon color="secondary" />,
    "Follow-up": <VisibilityIcon color="action" />
};

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onDelete, onEdit }) => {
    const [sortBy, setSortBy] = useState("date");
    const [searchTerm, setSearchTerm] = useState("");

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
            <FormControl fullWidth margin="dense">
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                margin="dense"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2, margin: 2 }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{appointment.title}</Typography>
                        {iconMap[appointment.type]}
                        <Typography variant="subtitle1">{appointment.datetimeString.split("T")[0]}</Typography>
                        <Typography variant="subtitle2">{appointment.datetimeString.split("T")[1]}</Typography>
                    </CardContent>
                    <IconButton onClick={() => onEdit(appointment)}>
                        <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => onDelete(appointment.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Card>
            ))}
        </div>
    );
};

export default AppointmentList;