import React, { JSX } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { IAppointment } from "../interfaces/IAppointment";

interface AppointmentCardProps {
    appointment: IAppointment;
    onClick: (appointment: IAppointment) => void;
}

const iconMap: { [key: string]: JSX.Element } = {
    "Meeting": <EventIcon fontSize="large" />,
    "Arzttermin": <MedicalServicesIcon fontSize="large" />,
    "Sport": <FitnessCenterIcon fontSize="large" />
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onClick }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                margin: 2
            }}
            onClick={() => onClick(appointment)}
        >
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {iconMap[appointment.type]}
                <Typography variant="h6" sx={{ marginTop: 1 }}>{appointment.type}</Typography>
            </CardContent>

            <CardContent sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">{appointment.datetimeString.split("T")[0]}</Typography>
                <Typography variant="subtitle2">{appointment.datetimeString.split("T")[1]}</Typography>
            </CardContent>
        </Card>
    );
};

export { AppointmentCard };