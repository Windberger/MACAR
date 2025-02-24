import React, { JSX } from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { IAppointment } from "../interfaces/IAppointment";

interface AppointmentCardProps {
    appointment: IAppointment;
    onDelete: (id: number) => void;
    onEdit: (appointment: IAppointment) => void;
}

const iconMap: { [key: string]: JSX.Element } = {
    "Meeting": <EventIcon />,
    "Arzttermin": <MedicalServicesIcon />,
    "Sport": <FitnessCenterIcon />
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onDelete, onEdit }) => {
    return (
        <Card variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2, margin: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{appointment.title}</Typography>
                {iconMap[appointment.type]}
                <Typography variant="subtitle1">{appointment.datetimeString.split("T")[0]}</Typography>
                <Typography variant="subtitle2">{appointment.datetimeString.split("T")[1]}</Typography>
            </CardContent>
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => onEdit(appointment)}
                >
                    See More
                </Typography>
            </CardContent>
            <IconButton onClick={() => onDelete(appointment.id)}>
                <DeleteIcon />
            </IconButton>
        </Card>
    );
};

export { AppointmentCard };