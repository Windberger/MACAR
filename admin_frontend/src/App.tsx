import './App.css';
import { useState } from 'react';
import WeeklySchedule from "./components/WeeklySchedule";
import AppointmentDialog from "./components/AppointmentDialog";
import AppointmentList from "./components/AppointmentList";
import { IAppointment } from "./interfaces/IAppointment";

function App() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = (appointmentData: IAppointment) => {
        setAppointments([...appointments, appointmentData]);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    const handleEdit = (updatedAppointment: IAppointment) => {
        setAppointments(appointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    };

    return (
        <div className="App flex flex-row justify-center items-start h-screen">
            <div className="w-1/2 p-4">
                <WeeklySchedule />
                <button
                    onClick={handleOpenDialog}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Make Appointment
                </button>
            </div>
            <div className="w-1/2 p-4">
                <AppointmentList
                    appointments={appointments}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
            {isDialogOpen && (
                <AppointmentDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default App;