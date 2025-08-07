import {useState, useEffect, useContext} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import {AddAppointment, IAppointment} from "../interfaces/IAppointment";
import {addAppointment} from "../services/appointmentService";
import {UserContext} from "../../homepage/context/UserContext";
import {User} from "../types/UserData.ts";
import {fetchAllUsers} from "../services/userService.ts";

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
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const userContext = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);

    if (!userContext) {
        throw new Error("UserContext not found");
    }

    const {token} = userContext;

    useEffect(() => {
        if (appointment) {
            setDate(appointment.datetimeString.split("T")[0]);
            setTime(appointment.datetimeString.split("T")[1].split(":")[0] + ":"
                + appointment.datetimeString.split("T")[1].split(":")[1]);
            console.log(appointment)
            setType(appointment.type);
            setDescription(appointment.description);
        } else {
            setDate("");
            setTime("");
            setType("");
            setDescription("");
        }

        if(!token) {
            console.error("No token found. ");
            return;
        }

        fetchAllUsers(token).then((fetchedUsers) => {
            setUsers(fetchedUsers);
        }).catch((error) => {
            console.error("Error fetching users:", error);
            setUsers([]);
        });
    }, [appointment]);

    const handleSubmit = async () => {
        if (token) {
            if(appointment) {
                const datetimeString = `${date}T${time}`;
                const newAppointment: AddAppointment = {
                    user: selectedUserId,
                    datetime: new Date(datetimeString),
                    type: type,
                    description: description,
                };

                try {
                    await addAppointment(token, newAppointment);
                    onSubmit(newAppointment);
                    onClose();
                } catch (error) {
                    console.error("Error adding appointment:", error);
                }
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="dark:text-white dark:bg-gray-800">
                {appointment ? "Edit Appointment" : "Make an Appointment"}
            </DialogTitle>
            <DialogContent className="dark:bg-gray-800">

                {
                    appointment &&
                    <TextField
                        fullWidth
                        margin="dense"
                        label="User"
                        select
                        value={appointment.first_name}
                        onChange={(e) => {
                            setSelectedUserId(e.target.value);
                        }}
                        className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    >
                        {
                            users.map((user) => (
                                <MenuItem
                                    key={user.user_id}
                                    value={user.user_id}
                                    className="dark:text-white dark:bg-gray-700"
                                >
                                    {`${user.first_name} ${user.last_name} (${user.email})`}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                }
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Time"
                    type="time"
                    InputLabelProps={{shrink: true}}
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
                        Repairing
                    </MenuItem>
                    <MenuItem value="Checkup" className="dark:text-white dark:bg-gray-700">
                        Car-Wash
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