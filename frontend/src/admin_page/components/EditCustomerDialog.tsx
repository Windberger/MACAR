import React, {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button} from "@mui/material";
import {User} from "../types/UserData.ts";

interface EditCustomerDialogProps {
    customer: User;
    onClose: () => void;
    onSave: (customer: User) => void;
}

const EditCustomerDialog = ({customer, onClose, onSave}: EditCustomerDialogProps) => {
    const [formData, setFormData] = useState({...customer});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className="dark:bg-gray-800 dark:text-white">
                Edit Customer
            </DialogTitle>
            <DialogContent className="dark:bg-gray-800">
                <TextField
                    margin="dense"
                    label="First Name"
                    name="first_name"
                    fullWidth
                    value={formData.first_name}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{className: "dark:text-gray-300"}}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    value={formData.last_name}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{className: "dark:text-gray-300"}}
                />
                <TextField
                    margin="dense"
                    label="Mobile / Email"
                    name="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{className: "dark:text-gray-300"}}
                />
                <TextField
                    margin="dense"
                    label="Points (out of 8)"
                    name="bonus"
                    fullWidth
                    type="number"
                    value={formData.bonus}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{className: "dark:text-gray-300"}}
                />
            </DialogContent>
            <DialogActions className="dark:bg-gray-800">
                <Button onClick={onClose} className="dark:text-gray-300">
                    Cancel
                </Button>
                <Button onClick={handleSave} className="dark:bg-blue-600 dark:text-white">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCustomerDialog;