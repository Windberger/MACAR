import {useState, useEffect, useContext} from "react";
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
import {addAppointment} from "../services/appointmentService.ts";

interface AppointmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (appointment: IAppointment) => void;
    appointment?: IAppointment | null;
}

import {UserContext} from "../../homepage/context/UserContext.tsx";


const AppointmentDialog: React.FC<AppointmentDialogProps> = ({open, onClose, onSubmit, appointment}) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const {token} = userContext;


    useEffect(() => {
        if (appointment) {
            console.log("in appointment!!!!!!!!!!!!!!!!");
            setDate(appointment.datetimeString.split("T")[0]);
            setTime(appointment.datetimeString.split("T")[1]);
            setType(appointment.type);
            setDescription(appointment.description);
        } else {
            setDate("");
            setTime("");
            setType("");
            setDescription("");
        }
    }, [appointment]);

    const handleSubmit = async () => {
        if (token) {
            console.log(type)

            const datetimeString = `${date}T${time}`;
            const newAppointment: IAppointment = {
                id: appointment ? appointment.id : Date.now(),
                datetime: new Date(datetimeString),
                datetimeString,
                type,
                description
            };

            try {
                console.log(newAppointment);
                await addAppointment(token, newAppointment);
                onSubmit(newAppointment);
                onClose();
            } catch (error) {
                console.error("Fehler beim Hinzufügen des Termins:", error);
            }
        } else {
            console.log("no token");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{appointment ? "Edit Appointment" : "Make an Appointment"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Time"
                    type="time"
                    InputLabelProps={{shrink: true}}
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