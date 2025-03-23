import { useState } from 'react';
import WeeklySchedule from "./components/WeeklySchedule";
import AppointmentDialog from "./components/AppointmentDialog";
import AppointmentList from "./components/AppointmentList";
import { IAppointment } from "./interfaces/IAppointment";
import CustomerList from "./components/CustomerList.tsx";

function AdminPage() {
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
        <div className="App flex flex-row justify-center items-start h-screen gap-4 p-4 ">
            <div className="flex">
                <WeeklySchedule />

                <AppointmentList
                    appointments={appointments}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>

            <button
                onClick={handleOpenDialog}
                className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Make Appointment
            </button>

            {isDialogOpen && (
                <AppointmentDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                />
            )}

            <div className="w-full lg:w-3/4 xl:w-2/3">
                <CustomerList />
            </div>
        </div>
    );
}

export default AdminPage;