import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const EditCustomerDialog = ({ customer, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...customer });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    label="Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{ className: "dark:text-gray-300" }}
                />
                <TextField
                    margin="dense"
                    label="Mobile / Email"
                    name="contact"
                    fullWidth
                    value={formData.contact}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{ className: "dark:text-gray-300" }}
                />
                <TextField
                    margin="dense"
                    label="Points (out of 8)"
                    name="points"
                    fullWidth
                    value={formData.points}
                    onChange={handleChange}
                    className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
                    InputLabelProps={{ className: "dark:text-gray-300" }}
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