import { useState, useEffect, useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { IAppointment } from "../interfaces/IAppointment";
import { addAppointment } from "../services/appointmentService";
import { UserContext } from "../../homepage/context/UserContext";

interface AppointmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (appointment: IAppointment) => void;
    appointment?: IAppointment | null;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 onSubmit,
                                                                 appointment,
                                                             }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext not found");
    }

    const { token } = userContext;

    useEffect(() => {
        if (appointment) {
            setTitle(appointment.title || "");
            setDate(appointment.datetimeString.split("T")[0]);
            setTime(appointment.datetimeString.split("T")[1]);
            setType(appointment.type);
            setDescription(appointment.description);
        } else {
            setTitle("");
            setDate("");
            setTime("");
            setType("");
            setDescription("");
        }
    }, [appointment]);

    const handleSubmit = async () => {
        if (token) {
            const datetimeString = `${date}T${time}`;
            const newAppointment: IAppointment = {
                id: appointment ? appointment.id : Date.now(),
                title,
                datetime: new Date(datetimeString),
                datetimeString,
                type,
                description,
            };

            try {
                await addAppointment(token, newAppointment);
                onSubmit(newAppointment);
                onClose();
            } catch (error) {
                console.error("Error adding appointment:", error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="dark:text-white dark:bg-gray-800">
                {appointment ? "Edit Appointment" : "Make an Appointment"}
            </DialogTitle>
            <DialogContent className="dark:bg-gray-800">
                <TextField
                    fullWidth
                    margin="dense"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Appointment Type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                >
                    <MenuItem value="Consultation" className="dark:text-white dark:bg-gray-700">
                        Consultation
                    </MenuItem>
                    <MenuItem value="Checkup" className="dark:text-white dark:bg-gray-700">
                        Checkup
                    </MenuItem>
                    <MenuItem value="Follow-up" className="dark:text-white dark:bg-gray-700">
                        Follow-up
                    </MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
            </DialogContent>
            <DialogActions className="dark:bg-gray-800">
                <Button onClick={onClose} className="dark:text-white">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" className="dark:bg-blue-600">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppointmentDialog;