import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem
} from "@mui/material";
import {IAppointment} from "../interfaces/IAppointment.ts";

interface AppointmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (appointment: IAppointment) => void;
    appointment?: IAppointment | null;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({ open, onClose, onSubmit, appointment }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (appointment) {
            setDate(appointment.datetimeString.split("T")[0]);
            setTime(appointment.datetimeString.split("T")[1]);
            setTitle(appointment.title || "");
            setType(appointment.type);
            setDescription(appointment.description);
        } else {
            setDate("");
            setTime("");
            setTitle("");
            setType("");
            setDescription("");
        }
    }, [appointment]);

    const handleSubmit = () => {
        const datetimeString = `${date}T${time}`;
        const newAppointment: IAppointment = {
            id: appointment ? appointment.id : Date.now(),
            datetime: new Date(datetimeString),
            datetimeString,
            title,
            type,
            description
        };
        onSubmit(newAppointment);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{appointment ? "Edit Appointment" : "Make an Appointment"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Appointment Type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="Consultation">Consultation</MenuItem>
                    <MenuItem value="Checkup">Checkup</MenuItem>
                    <MenuItem value="Follow-up">Follow-up</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppointmentDialog;